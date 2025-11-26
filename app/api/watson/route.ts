import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    // 1. Exchange API key for IAM token
    const iamRes = await fetch("https://iam.cloud.ibm.com/identity/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      },
      body: new URLSearchParams({
        grant_type: "urn:ibm:params:oauth:grant-type:apikey",
        apikey: process.env.WATSON_API_KEY!
      })
    });

    const iamJson = await iamRes.json();
    const accessToken = iamJson.access_token;

    if (!accessToken) {
      console.error("IAM Token error:", iamJson);
      return NextResponse.json({ error: "Failed to get IAM token", details: iamJson }, { status: 500 });
    }

    // 2. Call Orchestrate with IAM token
    const orchestrateURL = `${process.env.WATSON_SERVICE_URL}/api/v1/orchestrate/runs`;

    const body = {
      agent_id: process.env.WATSON_AGENT_ID,
      message: {
        role: "user",
        content: [
          {
            response_type: "text",
            sub_type: "text",
            event_type: "message",
            form_operation: "input",
            id: "user-input",
            form_data: { text: message }
          }
        ],
        mentions: []
      }
    };

    const response = await fetch(orchestrateURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    console.log("Watson response status:", response.status);
    console.log("Watson response body:", data);

    if (!response.ok) {
      return NextResponse.json({ error: "Orchestrate error", details: data }, { status: response.status });
    }

    // Extract reply
    const reply =
      data?.run?.outputs?.[0]?.text ??
      data?.choices?.[0]?.message?.content ??
      data;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Fatal error:", error);
    return NextResponse.json({ error: "Request failed", details: String(error) }, { status: 500 });
  }
}
