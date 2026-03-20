const express = require("express");
const axios = require("axios");
const path = require("path");

axios.interceptors.request.use((request) => {
  console.log("Axios Request:", {
    url: request.url,
    method: request.method,
    headers: request.headers,
    data: request.data,
  });
  return request;
});

axios.interceptors.response.use(
  (response) => {
    console.log("Axios Response:", {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.log("Axios Error:", {
      message: error.message,
      status: error.response.status,
      data: error.response.data,
    });
    return Promise.reject(error);
  },
);

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "static")));

app.post("/api/message", (req, res) => {
  const { message } = req.body;
  console.log("Received message:", message);
  // const params = new URLSearchParams();
  // params.append(
  //   "f.req",
  //   `[null,"[[[[\"78dec403-3eb6-41ba-a2dc-31875e26a432\"]]],\"${message}\",null,[2,null,[1],[1]],\"95fc8323-1f8c-4f6a-bf3f-a85f3e020b4e\",null,null,\"1ea78ac6-618b-475d-81e2-67fb82ed08b3\",1]"]`,
  // );
  // params.append("at", "AIXQIkbMycBH--SpCTWs0OU0GZ73%3A1773993561945");

  // axios
  //   .post(
  //     "https://notebooklm.google.com/_/LabsTailwindUi/data/google.internal.labs.tailwind.orchestration.v1.LabsTailwindOrchestrationService/GenerateFreeFormStreamed",
  //     params.toString(),
  //     {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  //         Accept: "*/*",
  //         "User-Agent": "curl/8.5.0",
  //         Cookie:
  //           "SEARCH_SAMESITE=CgQI_p8B; __Secure-BUCKET=CJIG; SOCS=CAISHAgCEhJnd3NfMjAyNjAxMjEtMF9SQzEaAmVuIAEaBgiA3drLBg; SID=g.a0007whNsetq_JglcoTr1LeWATJ5X0WtKy7N21sFJKiRAb0_aPO7NDFw0YuZttkJXRrb7QH09gACgYKASsSARcSFQHGX2MiqSuAt44UfSzO3s67NcMdbBoVAUF8yKpbHyYOTD_v0TWbhyA_M1T80076; __Secure-1PSID=g.a0007whNsetq_JglcoTr1LeWATJ5X0WtKy7N21sFJKiRAb0_aPO7oqukE4Sv_7xWtlRkZJCKHQACgYKATsSARcSFQHGX2MiwPcNEDiT7AF8BtkWa2boLBoVAUF8yKolBS5MTvYcbSJ-9p6u7-ro0076; __Secure-3PSID=g.a0007whNsetq_JglcoTr1LeWATJ5X0WtKy7N21sFJKiRAb0_aPO7F0OjS2CaqsuGDgbhbtAMSAACgYKAQcSARcSFQHGX2MiiKtJO06eepvZIcxGUmGlgRoVAUF8yKrjLlmHWZzdlGpjLRGZnKVQ0076; HSID=A-fMC5PxnETF1srzE; SSID=ACOHxxdSstiIHeU1r; APISID=HPPHa-Uax0nMlgom/ApClF7IiiChBxCNbA; SAPISID=8avT2MkjP5vUSZAZ/Ac-xmDo1BPRyzNPV4; __Secure-1PAPISID=8avT2MkjP5vUSZAZ/Ac-xmDo1BPRyzNPV4; __Secure-3PAPISID=8avT2MkjP5vUSZAZ/Ac-xmDo1BPRyzNPV4; AEC=AaJma5t5DdRZ04ma7lOR7nEQjffDD-uiVruZUmFIdp0lp_XJoFNBW2dAKPc; OSID=g.a0007whNsRH7wwl03pyKBZHK4uokBHmQN5iLgcBxGlwwiSayoXTBItuASpB3cHKNVPo3fc2t4AACgYKAWUSARcSFQHGX2Mi_0OOskfavx30CWch8MM_BxoVAUF8yKoeiON_xj5k3-WpL5xaXukP0076; __Secure-OSID=g.a0007whNsRH7wwl03pyKBZHK4uokBHmQN5iLgcBxGlwwiSayoXTB4VOetCQ3hDYpisZ6LiSkSAACgYKAZQSARcSFQHGX2MiALB_h_TyjZ7PjG1Lb0XRjBoVAUF8yKpDeRQ-zoT7WQQJPGHkdPDc0076; _gcl_aw=GCL.1773938622.Cj0KCQjwve7NBhC-ARIsALZy9HVwG9cbD5qwFW4SmB4sXkAynNAVxNlpb-ea9ueLSpipED5gQTNFqMcaAmneEALw_wcB; _gcl_au=1.1.1519520459.1773938622; _ga=GA1.1.91963420.1773938618; NID=529=G3B7HsMt0ZyR3tRv5RWPQJADJp_noxtcUddxXU01gsnhcoRCzj1MxdLyRrSUTADiKWu1t_0cqKEh-VKkSu8wD4xcH7ERDPfG0mW1UxvI5A6qrrBPWFn3ejswHlc9tCzVRZ3tRJov0NRp00jOmYclz_F7KvwXRwFrw5xXdgqx7h4LcOA8e0vqCJ4LKlO1S1o8pvpStUctWLTaDUvXUJcTRrsMlkLfTHhlF5A1ZWjBQ3fwHPsgN3s4KSIVGE0EUYIQUA_tuBj7bQdD5gIsMdWx2yXhQ_5keyWeqF6XIOIm28uDZj6ev9XQXj2vA_R_uOt-XKSdEVtHpScyB12WLdzvCnct-fR1CXS4GnG6Rd-kp_ReZfUIAheHra06TScHsUjbKWebjpw6lHtdxNNsRXDT_dhZwItzVjtW5ouLZF6GLP-6QrBI1E-NQbQg42RzipRaBY5dSHio7-HS8YwIkzZpxqOsMBYYiAybfcFgc5pl7_Dz8tWoYEqCJj97NQYmwxTTeVb96Bi0HralmJDCyTucGssRNX3uXp0cDHvIh_O7vBHJJHx1VB5rLM_OL9h4YV86ZYnvjvgaoF9wvnS2s5rmsqNpqUDtHmNj52eKxnEyrI_Pp_UkcwX2FRUsyy2Mp5rg-owBAoVaRKrjdxOV4G25AEiKQwP_dsNE_AkXkEJRleS7H-A-zvFHkPs4MAS6Qb8CiS4AY2XS0U5BmiZSt3KYc9eyX-MAFBGmMfsCP1czCH7pcaiKhLrYRGp7HpG3IIPd2eXLDP4wlIJ9KhdxgNfPKp726XG4Lj6ZGMfoasTW1lw1YECBJgxWfReLteuJlCcwpSXNiFOJ5A; __Secure-1PSIDTS=sidts-CjEBBj1CYhdy4cKzaN-f_yfHvtn5Sj2X3iMXNEpLMnHnOJ3jvVS1MwcmQTbjyw1Cu9eWEAA; __Secure-3PSIDTS=sidts-CjEBBj1CYhdy4cKzaN-f_yfHvtn5Sj2X3iMXNEpLMnHnOJ3jvVS1MwcmQTbjyw1Cu9eWEAA; SIDCC=AKEyXzVgO8A_eEa9E2rZB809w7my2lmEkpwiIqXT9oBA7b8AnxV2sw6KOEMwqLP456E9NUWihbc; __Secure-1PSIDCC=AKEyXzUUyirZFHAS_FNdByn_hKOdsBl1rTU5TvJawYP1yjPrn1aB4o1A-E5TGkOt028w7EonP7O3; __Secure-3PSIDCC=AKEyXzWPla56S8TvQBhWi324nVBiHAPz9L6kPAEcr4XMJkZbeWbzdBazhHv9haU7jaEZXVpuhzY; _ga_W0LDH41ZCB=GS2.1.s1773998304$o3$g0$t1773998304$j60$l0$h0",
  //       },
  //     },
  //   )
  //   .then((response) => {
  //     res.json({ response: response.data });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ response: error.message });
  //   });
  const response = require("fs").readFileSync(
    path.join(__dirname, "tmp", "response.txt"),
    "utf8",
  );

  const parts = response.split('"wrb.fr"');

  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");
  let i = 0;
  function writeNextPart() {
    if (i < parts.length) {
      console.log("Sending part:", i);
      res.write(parts[i] + "\n");
      i++;
      setTimeout(writeNextPart, 1000);
    } else {
      console.log("All parts sent");
      res.end();
    }
  }
  writeNextPart();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
