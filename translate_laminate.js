const fs = require('fs');
const path = 'c:/Users/김승연/OneDrive/Desktop/blanche-backend-main/blanche-backend-main/src/messages/en.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Apply Premium English translations to the entire laminate section
data.solution.laminate.title = "No-Prep Laminate | Blanche Dental Clinic";
data.solution.laminate.description = "Blanche Dental Clinic's no-prep laminate preserves your natural teeth while perfecting an elegantly natural smile. It is an innovative aesthetic treatment that refines your teeth with zero damage.";
data.solution.laminate.meta.title = "Blanche Laminate | Blanche Dental Clinic - No-Prep Laminate";
data.solution.laminate.meta.description = "Blanche Laminate perfects your smile naturally by preserving your natural teeth. With meticulous craftsmanship from our in-house lab and an industry-leading 10-year warranty, we promise a healthy smile for decades.";

// Hero
data.solution.laminate.hero.subtitle = "No-Prep Laminate";
data.solution.laminate.hero.title = "Preserving your teeth\nto complete a flawless smile";
data.solution.laminate.hero.description = "Achieve a beautifully aligned smile without sacrificing your natural teeth.";
data.solution.laminate.hero.button.text = "Book Consultation";
data.solution.laminate.hero.textLayout.text = "Blanche Laminate";
data.solution.laminate.hero.textLayout.subtitle = "Premium laminates\npreserving your teeth";

// What
data.solution.laminate.what.title = "What is No-Prep Laminate?";
data.solution.laminate.what.description = "An aesthetic dental treatment improving color, shape, and size by attaching ultra-thin ceramic veneers without grinding natural teeth.";
data.solution.laminate.what.image.alt = "No-prep laminate illustration";
data.solution.laminate.what.textGroup.firstText = "No-prep Laminate";
data.solution.laminate.what.textGroup.secondText = "What is a no-prep laminate?";
data.solution.laminate.what.textGroup.thirdText = "A method to transform\nyour front teeth without prep.\n\nHowever, minimal reshaping\nmay be needed occasionally.";
data.solution.laminate.what.items[0].firstText = "No-Prep\nLaminate";
data.solution.laminate.what.items[0].secondText = "• Zero grinding\n• No sensitivity";
data.solution.laminate.what.items[1].firstText = "Min-Prep\nLaminate";
data.solution.laminate.what.items[1].secondText = "• Under 0.1mm prep\n• No sensitivity";
data.solution.laminate.what.items[2].firstText = "General\nLaminate";
data.solution.laminate.what.items[2].secondText = "• Excessive prep\n• Causes sensitivity";

// Highlight
data.solution.laminate.highlight.title = "Blanche Laminates are\nexclusively no-prep\nor minimal-prep.";
data.solution.laminate.highlight.description = "We craft the perfect smile while preserving the absolute maximum of your natural teeth.";
data.solution.laminate.highlight.image.alt = "Laminate feature image";

// Process
data.solution.laminate.process.label = "About Blanche";
data.solution.laminate.process.title = "The safest choice\nfor your teeth";
data.solution.laminate.process.description = "An exclusive laminate solution\ndeveloped through 11 years of research\nand over 20,000 clinical cases.";

// Solution steps
data.solution.laminate.solution.title = "Treatment Process";
data.solution.laminate.solution.steps[0].title = "Diagnosis";
data.solution.laminate.solution.steps[0].description = ["Establishing the optimal plan", "through precise diagnosis."];
data.solution.laminate.solution.steps[1].title = "Temporary Laminate";
data.solution.laminate.solution.steps[1].description = ["Crafting temporary laminates", "to preview the shape."];
data.solution.laminate.solution.steps[2].title = "Final Attachment";
data.solution.laminate.solution.steps[2].description = ["Attaching your perfectly", "custom-made laminates."];

// Recommendation
data.solution.laminate.recommendation.label = "Recommended For";
data.solution.laminate.recommendation.title = "If you have these concerns,";
data.solution.laminate.recommendation.footer = "Reclaim your smile\nwith Blanche.";
data.solution.laminate.recommendation.subtitle = "No-prep laminates are suitable for dark teeth, wide gaps, or irregular shapes.";
data.solution.laminate.recommendation.features[0].title = "Color Improvement";
data.solution.laminate.recommendation.features[0].description = "For severely yellow or dark teeth";
data.solution.laminate.recommendation.features[1].title = "Gap Adjustment";
data.solution.laminate.recommendation.features[1].description = "For wide gaps between teeth";
data.solution.laminate.recommendation.features[2].title = "Shape Refinement";
data.solution.laminate.recommendation.features[2].description = "For irregular tooth shapes";
data.solution.laminate.recommendation.features[3].title = "Prominent Teeth";
data.solution.laminate.recommendation.features[3].description = "For front teeth that protrude or appear too large";
data.solution.laminate.recommendation.cases[0].title = "Black Triangles";
data.solution.laminate.recommendation.cases[0].description = "Want to close gaps\nbut avoid braces";
data.solution.laminate.recommendation.cases[1].title = "Prominent Teeth";
data.solution.laminate.recommendation.cases[1].description = "Front teeth look\ntoo large or protruding";
data.solution.laminate.recommendation.cases[2].title = "Microdontia";
data.solution.laminate.recommendation.cases[2].description = "Teeth are too small\nlacking volume";
data.solution.laminate.recommendation.cases[3].title = "Discoloration";
data.solution.laminate.recommendation.cases[3].description = "Severe yellowing\nunfixable by whitening";
data.solution.laminate.recommendation.cases[4].title = "Irregular Alignment";
data.solution.laminate.recommendation.cases[4].description = "Overlapping front teeth\nneeding alignment";
data.solution.laminate.recommendation.cases[5].title = "Laminate Revision";
data.solution.laminate.recommendation.cases[5].description = "Need to replace\nold laminates";

// Highlight 2
data.solution.laminate.highlight2.title = "Side Effects of Limitless Prep";
data.solution.laminate.highlight2.description = "Excessive grinding despite preservability\noften leads to sensitivity and gum inflammation.";
data.solution.laminate.highlight2.image.alt = "Blanche lab image";

// Sideeffect
data.solution.laminate.sideeffect.title = "Side Effects & Precautions";
data.solution.laminate.sideeffect.description = "No-prep laminates carry almost no side effects. However, caution with hard foods and regular care are essential.";

// Strength
data.solution.laminate.strength.header.title.default = "Blanche Strengths";
data.solution.laminate.strength.header.subtitle.desktop = ["Blanche is different", "Aiming for healthy teeth even 10 years later"];
if(data.solution.laminate.strength.cases) {
  data.solution.laminate.strength.cases[0].treatmentType = "Swiss Premium\nHybrid Ceramic";
  data.solution.laminate.strength.cases[0].quote = "Using 100% Swiss Feldspar-based\npremium ceramics.\n\nCrafting a seamlessly natural\ntransparency with a refractive index\nidentical to natural teeth.";
  data.solution.laminate.strength.cases[0].reviewTitle = "Swiss Premium Hybrid Ceramic";
  data.solution.laminate.strength.cases[0].reviewContent = "Using 100% Swiss Feldspar-based premium ceramics. Crafting a seamlessly natural transparency identically to natural teeth.";

  data.solution.laminate.strength.cases[1].treatmentType = "In-house Facility\nBlanche Lab";
  data.solution.laminate.strength.cases[1].quote = "Handcrafted by a French-trained\ntechnician right next door.\n\nCustomized 1:1 analysis\nof gums and facial structure.";
  data.solution.laminate.strength.cases[1].reviewTitle = "In-house Facility Blanche Lab";
  data.solution.laminate.strength.cases[1].reviewContent = "Handcrafted by a French-trained technician right next door. Customized 1:1 analysis of gums and facial structure.";

  data.solution.laminate.strength.cases[2].treatmentType = "0.01mm\nUltra-precision";
  data.solution.laminate.strength.cases[2].quote = "Ultra-thin crafting and bonding\nperfected over 11 years.\n\nPrep designs that prioritize\ntooth and gum health.";
  data.solution.laminate.strength.cases[2].reviewTitle = "0.01mm Ultra-Precision Design";
  data.solution.laminate.strength.cases[2].reviewContent = "Ultra-thin crafting and bonding perfected over 11 years. Prep designs that prioritize tooth and gum health.";

  data.solution.laminate.strength.cases[3].treatmentType = "Industry-Max 10-Yr\nWarranty System";
  data.solution.laminate.strength.cases[3].quote = "Up to 10-year warranty\nwith no extra fees.\n\nComplete with regular checkups\nto preempt any issues.";
  data.solution.laminate.strength.cases[3].reviewTitle = "Industry-Max 10-Yr Warranty System";
  data.solution.laminate.strength.cases[3].reviewContent = "Up to 10-year warranty with no extra fees. Complete with regular checkups to preempt any issues.";
}

data.solution.laminate.strength.title = "Strengths of Blanche Laminates";
data.solution.laminate.strength.subtitle = "Performed directly by the Chief Director\nwith 30,000 cases of experience.";

if(data.solution.laminate.strength.features) {
  data.solution.laminate.strength.features[0].title = "Swiss Premium Hybrid Ceramic";
  data.solution.laminate.strength.features[0].description = "100% Swiss Feldspar-based premium ceramics crafting a seamlessly natural transparency.";
  data.solution.laminate.strength.features[1].title = "In-house Facility Blanche Lab";
  data.solution.laminate.strength.features[1].description = "Handcrafted by a French-trained technician customized 1:1 for your facial structure.";
  data.solution.laminate.strength.features[2].title = "0.01mm Ultra-Precision Design";
  data.solution.laminate.strength.features[2].description = "Ultra-thin crafting and bonding prioritizing tooth and gum health.";
  data.solution.laminate.strength.features[3].title = "10-Year Warranty & Care System";
  data.solution.laminate.strength.features[3].description = "Up to 10-year warranty with zero extra fees and regular preemptive checkups.";
}
data.solution.laminate.strength.textGroup.firstText = "About Blanche";
data.solution.laminate.strength.textGroup.secondText = "The safest choice for your teeth, Blanche";

// doctor
data.solution.laminate.doctor.label = "Directly Performed by the Chief Director";
data.solution.laminate.doctor.title = "Performed directly by the Chief Director\nwith 30,000 cases of experience.";
data.solution.laminate.doctor.description = "For no-prep or minimal-prep laminates,\nthe mastery and experience of the doctor\nabsolutely dictate the final outcome.";
data.solution.laminate.doctor.career = ["Seoul National University Alumni", "Trained at US Columbia Dental Hospital", "Trained at UCLA Dental Hospital"];
data.solution.laminate.doctor.name = "Chief Director Kim Tae-Hyung";

// masterpiece
data.solution.laminate.masterpiece.title = "Treatment Cases";
data.solution.laminate.masterpiece.textGroup.firstText = "Blanche Laminates";
data.solution.laminate.masterpiece.textGroup.secondText = "Those who found their smiles with Blanche";
data.solution.laminate.masterpiece.textGroup.thirdText = "Check the actual treatment results.";
data.solution.laminate.masterpiece.items[0].firstText = "Prominent Teeth";
data.solution.laminate.masterpiece.items[0].secondText = "Front teeth look too large or protruding";
data.solution.laminate.masterpiece.items[1].firstText = "Color Improvement";
data.solution.laminate.masterpiece.items[1].secondText = "For severely yellow or dark teeth";
data.solution.laminate.masterpiece.items[2].firstText = "Gap Adjustment";
data.solution.laminate.masterpiece.items[2].secondText = "For wide gaps between teeth";
data.solution.laminate.masterpiece.items[3].firstText = "Shape Refinement";
data.solution.laminate.masterpiece.items[3].secondText = "For irregular tooth shapes";
data.solution.laminate.masterpiece.items[4].firstText = "Aesthetic Revisions";
data.solution.laminate.masterpiece.items[4].secondText = "Overall smile line improvement";

// procedure
data.solution.laminate.procedure.label = "Blanche Procedure Flow";
data.solution.laminate.procedure.title = "In just one day,\nyour smile becomes\na masterpiece."; // actually the user already let this be masterpiece, but let's change it. "In just one day,\nyour smile becomes\nart."
data.solution.laminate.procedure.title = "In just one day,\nyour smile transforms\ninto art.";
data.solution.laminate.procedure.subtitle = "Everything from consultation to completion happens in a single day.";
data.solution.laminate.procedure.steps[0].title = "Design Consultation";
data.solution.laminate.procedure.steps[0].description = "Designing the shape,\ncolor, and line to fit\nyour face and taste.";
data.solution.laminate.procedure.steps[1].title = "Tooth Prep";
data.solution.laminate.procedure.steps[1].description = "Refining teeth with\nzero grinding or\nabsolute minimal prep.";
data.solution.laminate.procedure.steps[2].title = "3D Scanning";
data.solution.laminate.procedure.steps[2].description = "Measuring teeth\nprecisely with an\noral 3D scanner.";
data.solution.laminate.procedure.steps[3].title = "Prosthetic Crafting";
data.solution.laminate.procedure.steps[3].description = "Handcrafted by a\nFrench-trained tech\nin our in-house lab.";
data.solution.laminate.procedure.steps[4].title = "Final Attachment";
data.solution.laminate.procedure.steps[4].description = "Attaching the Blanche\nand completing the\nprocedure same day.";

// beforeAfter
data.solution.laminate.beforeAfter.label = "Laminate Treatment Reviews";
data.solution.laminate.beforeAfter.title = "Those who found their smiles with Blanche";
data.solution.laminate.beforeAfter.description = "Drag the screen to compare before and after";
data.solution.laminate.beforeAfter.footer = "Your smile too,\nwill beautifully transform.";
data.solution.laminate.beforeAfter.cases[0].title = "Black Triangles";
data.solution.laminate.beforeAfter.cases[0].description = "Want to close gaps but avoid braces";
data.solution.laminate.beforeAfter.cases[1].title = "Prominent Teeth";
data.solution.laminate.beforeAfter.cases[1].description = "Front teeth look too large or protruding";
data.solution.laminate.beforeAfter.cases[2].title = "Microdontia";
data.solution.laminate.beforeAfter.cases[2].description = "Teeth are too small lacking volume";
data.solution.laminate.beforeAfter.cases[3].title = "Discoloration";
data.solution.laminate.beforeAfter.cases[3].description = "Severe yellowing unfixable by whitening";
data.solution.laminate.beforeAfter.cases[4].title = "Irregular Alignment";
data.solution.laminate.beforeAfter.cases[4].description = "Overlapping front teeth needing alignment";
data.solution.laminate.beforeAfter.cases[5].title = "Laminate Revision";
data.solution.laminate.beforeAfter.cases[5].description = "Need to replace old laminates";

// faq
data.solution.laminate.faq.title = "Frequently Asked Questions";
data.solution.laminate.faq.mainTitle = "Blanche will \nkindly answer them.";
data.solution.laminate.faq.items[0].question = "How is Blanche different\nfrom standard laminates?";
data.solution.laminate.faq.items[0].answer_p1 = "Blanche is not just a prosthetic covering the tooth; it is a custom design crafted to bring out your unique beauty.";
data.solution.laminate.faq.items[0].answer_p2 = "At Blanche, an expert ceramist directly handles the entire process from consultation to crafting and final attachment.";
data.solution.laminate.faq.items[1].question = "Aren't thin laminates fragile?\nHow long do they last?";
data.solution.laminate.faq.items[1].answer = "Although thin, Blanche laminates use high-strength ceramics with exceptional durability. With proper care, they easily last over 10 years without issues during daily meals.";
data.solution.laminate.faq.items[2].question = "Will my gums swell or\nemit an odor after the procedure?";
data.solution.laminate.faq.items[2].answer = "Blanche laminates use no-prep or minimal-prep techniques, minimizing irritation. Meticulous custom crafting perfectly optimizes the gum line, virtually eliminating side effects.";
data.solution.laminate.faq.items[3].question = "Can I replace laminates done\nelsewhere with Blanche?";
data.solution.laminate.faq.items[3].answer = "Yes, absolutely. We can remove existing laminates and replace them with Blanche laminates. We first evaluate your condition to propose the optimal replacement strategy.";
if(data.solution.laminate.faq.items[4]) {
  data.solution.laminate.faq.items[4].question = "How should I care for them\nafter the procedure?";
  data.solution.laminate.faq.items[4].answer = "Just like natural teeth, brush and floss thoroughly. Schedule regular 6-month checkups and cleanings to maintain them flawlessly.";
}

fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Successfully updated en.json with native English translations for Laminate.');
