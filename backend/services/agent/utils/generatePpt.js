import pptxgen from "pptxgenjs";

export const generatePpt = async (data) => {
  const ppt = new pptxgen();
  ppt.layout = "LAYOUT_WIDE";
  ppt.author = "PolyForge";
  ppt.title = data.title;
  ppt.subject = data.title;
  ppt.company = "PolyForge";
  ppt.lang = "en-US";
  ppt.theme = {
    headFontFace: "Aptos",
    bodyFontFace: "Aptos",
    lang: "en-US",
  };

  //   addCover(ppt, data);

  //   data?.slides?.forEach((s, i) => {
  //     addContentSlide(ppt, s.title, s.points, i + 1, data.slides.length);
  //   });

  //   addThankYou(ppt);
};
