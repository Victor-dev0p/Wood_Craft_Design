const FLW_BASE_URL = "https://api.flutterwave.com/v3";

export async function initiateFlutterwavePayment({
  orderId,
  amount,
  email,
  name,
  redirectUrl,
}: {
  orderId: string;
  amount: number;
  email: string;
  name: string;
  redirectUrl: string;
}) {
  const res = await fetch(`${FLW_BASE_URL}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref: orderId,
      amount,
      currency: "USD",
      redirect_url: redirectUrl,
      customer: { email, name },
      customizations: { title: "Wood Craft & Design", description: "Furniture order payment" },
    }),
  });
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message || "Failed to initiate payment");
  return data.data.link as string;
}

export async function verifyFlutterwaveTransaction(transactionId: string) {
  const res = await fetch(`${FLW_BASE_URL}/transactions/${transactionId}/verify`, {
    headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` },
  });
  return res.json();
}