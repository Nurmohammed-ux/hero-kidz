export const orderInvoiceTemplate = ({
  orderId = "N/A",
  items = [],
  subtotal = 0,
  shipping = 0,
  totalAmount = 0,
  shippingAddress = {},
}) => {
  // Safe fallback to guarantee a valid numeric total
  const finalTotal =
    Number(totalAmount) || (Number(subtotal) || 0) + (Number(shipping) || 0);

  // Primary brand color hex equivalent of oklch(65% 0.23 35) for max email compatibility
  const primaryColor = "#F28C38";

  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #EFE8DC; border-radius: 20px; background-color: #ffffff; color: #3C352D;">
      
      <!-- Brand Header with Logo -->
      <div style="text-align: center; border-bottom: 2px solid #FAF8F5; padding-bottom: 20px; margin-bottom: 24px;">
        <img 
          src="https://i.ibb.co.com/0j9J36s4/logo.png" 
          alt="Hero Kidz Logo" 
          style="max-width: 160px; height: auto; display: block; margin: 0 auto 10px auto;" 
        />
        <h1 style="color: ${primaryColor}; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 0.5px;">HERO KIDZ</h1>
        <p style="color: #776B5D; margin: 4px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Official Order Invoice</p>
      </div>

      <!-- Order Summary & Shipping Details -->
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
        <tr>
          <td width="50%" valign="top" style="padding-right: 10px;">
            <div style="background-color: #FAF8F5; padding: 14px; border-radius: 12px; border: 1px solid #EFE8DC;">
              <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: bold; color: #776B5D; text-transform: uppercase;">Order Reference</p>
              <p style="margin: 0; font-size: 14px; font-weight: bold; color: #3C352D;">#${orderId}</p>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #776B5D;">Date: ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
            </div>
          </td>
          <td width="50%" valign="top" style="padding-left: 10px;">
            <div style="background-color: #FAF8F5; padding: 14px; border-radius: 12px; border: 1px solid #EFE8DC;">
              <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: bold; color: #776B5D; text-transform: uppercase;">Shipping To</p>
              <p style="margin: 0; font-size: 14px; font-weight: bold; color: #3C352D;">${shippingAddress.fullName || "Valued Parent"}</p>
              <p style="margin: 2px 0 0 0; font-size: 12px; color: #776B5D; line-height: 1.4;">
                ${shippingAddress.address || ""}${shippingAddress.city ? `, ${shippingAddress.city}` : ""}
              </p>
              ${shippingAddress.phone ? `<p style="margin: 4px 0 0 0; font-size: 12px; color: #776B5D;">📞 ${shippingAddress.phone}</p>` : ""}
            </div>
          </td>
        </tr>
      </table>

      <!-- Order Items Table -->
      <table width="100%" border="0" cellspacing="0" cellpadding="12" style="border-collapse: collapse; margin-bottom: 24px;">
        <thead>
          <tr style="background-color: #FAF8F5; color: #3C352D; text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
            <th style="padding: 12px 10px; border-bottom: 2px solid #EAE3D2;">Item Description</th>
            <th align="center" style="padding: 12px 10px; border-bottom: 2px solid #EAE3D2;">Qty</th>
            <th align="right" style="padding: 12px 10px; border-bottom: 2px solid #EAE3D2;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map(
              (item) => `
            <tr style="border-bottom: 1px solid #EFE8DC; font-size: 14px;">
              <td style="padding: 12px 10px; font-weight: 600; color: #3C352D;">${item.title || "Hero Toy / Product"}</td>
              <td align="center" style="padding: 12px 10px; color: #776B5D; font-weight: 600;">${item.quantity || 1}</td>
              <td align="right" style="padding: 12px 10px; font-weight: bold; color: #3C352D;">৳${(Number(item.price) || 0) * (Number(item.quantity) || 1)}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>

      <!-- Pricing Summary Breakdown -->
      <div style="background-color: #FAF8F5; padding: 18px; border-radius: 14px; margin-bottom: 24px; border: 1px solid #EFE8DC;">
        <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 14px;">
          ${
            subtotal > 0
              ? `<tr>
                  <td align="right" style="color: #776B5D;">Subtotal:</td>
                  <td align="right" width="110" style="font-weight: bold; color: #3C352D;">৳${subtotal}</td>
                </tr>`
              : ""
          }
          <tr>
            <td align="right" style="color: #776B5D;">Shipping Fee:</td>
            <td align="right" width="110" style="font-weight: bold; color: #3C352D;">৳${shipping}</td>
          </tr>
          <tr>
            <td colspan="2" style="padding-top: 8px;">
              <div style="border-top: 2px dashed #EAE3D2;"></div>
            </td>
          </tr>
          <tr style="font-size: 18px; font-weight: bold; color: #3C352D;">
            <td align="right" style="padding-top: 8px;">Total Amount:</td>
            <td align="right" width="110" style="padding-top: 8px; color: ${primaryColor}; font-size: 20px;">৳${finalTotal}</td>
          </tr>
        </table>
      </div>

      <!-- Footer Message -->
      <div style="text-align: center; font-size: 13px; color: #776B5D; border-top: 1px solid #EFE8DC; padding-top: 20px; margin-top: 24px;">
        <p style="margin: 0 0 6px 0; font-size: 15px; font-weight: bold; color: #3C352D;">
          Thank you for shopping with <span style="color: ${primaryColor};">Hero Kidz</span> ❤️
        </p>
        <p style="margin: 0; font-size: 12px; color: #776B5D; line-height: 1.5;">
          If you have any questions or need assistance, reply directly to this email or reach us at <strong>support@herokidz.com</strong>.
        </p>
      </div>

    </div>
  `;
};
