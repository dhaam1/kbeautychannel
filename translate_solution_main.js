const fs = require('fs');
const path = 'c:/Users/김승연/OneDrive/Desktop/blanche-backend-main/blanche-backend-main/src/messages/en.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Hero Scale
data.solutionHeroScale.title = "Blanche Dental Services";
data.solutionHeroScale.subtitle = "For any dental concern,\nexperience perfection\nthrough Blanche's mastery";
data.solutionHeroScale.button = "Book Consultation";

// Cards
data.solutionCard.category = "Signature Solutions";
data.solutionCard.title1 = "Premium aesthetics,\nBlanche's greatest pride";
data.solutionCard.title2 = "Blanche Signature Solutions";

data.solutionCard.items.implant.title = "Implants";
data.solutionCard.items.implant.description = "Precision implants to\nrestore your teeth\nand your daily life.";
data.solutionCard.items.implant.more = "Learn more >";

data.solutionCard.items.laminate.title = "Blanche Laminate";
data.solutionCard.items.laminate.description = "Premium laminates\ncrafted while preserving\nyour natural teeth.";
data.solutionCard.items.laminate.more = "Learn more >";

data.solutionCard.items.orthodontics.title = "Invisalign Orthodontics";
data.solutionCard.items.orthodontics.description = "Invisibly transparent.\nWe bring back\nharmony to your face.";
data.solutionCard.items.orthodontics.more = "Learn more >";

data.solutionCard.items.whitening.title = "Teeth Whitening";
data.solutionCard.items.whitening.description = "A whitening treatment\nto erase stains and\nretrieve pure transparency.";
data.solutionCard.items.whitening.more = "Learn more >";

// Grids
if(data.solutionGrid1) {
  data.solutionGrid1.category = "Aesthetic Enhancements";
  data.solutionGrid1.title = "Beyond teeth,\nenhance your lips and smile line\nfor a more natural smile\nwith Aesthetic Enhancements";
  data.solutionGrid1.items.gummySmile.name = "Gummy Smile Botox";
  data.solutionGrid1.items.gummySmile.description = "Concerned about excessive gum exposure?\nA simple botox procedure\nimproves it naturally.";
  data.solutionGrid1.items.vestibuloplasty.name = "Vestibuloplasty";
  data.solutionGrid1.items.vestibuloplasty.description = "Delicately adjusting lip movement\nto create a perfectly balanced\nsmile line.";
  data.solutionGrid1.items.lipFiller.name = "Lip Fillers";
  data.solutionGrid1.items.lipFiller.description = "Adding volume and line\nto complete the inherent beauty\nof your lips.";
}

if(data.solutionGrid2) {
  data.solutionGrid2.category = "General Dentistry";
  data.solutionGrid2.title = "Faithful to the basics,\npreserving natural teeth,\nGeneral Dentistry";
  data.solutionGrid2.items.checkup.name = "Oral Checkups";
  data.solutionGrid2.items.checkup.description = "The start of healthy teeth.\nManage in advance with\nregular oral checkups.";
  data.solutionGrid2.items.scaling.name = "Scaling";
  data.solutionGrid2.items.scaling.description = "Clean away tartar and plaque.\nWe protect the basics of\nyour oral health.";
  data.solutionGrid2.items.decay.name = "Cavity & Inflammation";
  data.solutionGrid2.items.decay.description = "Early detection and\nprecise treatment to protect\nyour natural teeth longer.";
}

// Banner
if (data.solutionBanner) {
  data.solutionBanner.category = "Sleep Dentistry Solutions";
  data.solutionBanner.title = "For those afraid of the dentist,\nBlanche Sleep Dentistry System\nSleep Dentistry Solutions";
  data.solutionBanner.description = "If you were worried about pain and gag reflexes,\nplease visit Blanche Dental Clinic.\n\n#Sleep Implants\n#Sleep Wisdom Tooth Extraction\n#Sleep Root Canal";
  data.solutionBanner.more = "Learn more";
}

// Introduction
if (data.solutionIntroduction) {
  data.solutionIntroduction.category = "Medical Team Introduction";
  data.solutionIntroduction.title = "Six specialists\ncollaborating strictly\nfor a single tooth";
  data.solutionIntroduction.description = "6 specialists with over 15 years average experience\ncreate one perfect result.";
}

// CTA
if (data.solutionCTA) {
  data.solutionCTA.category = "Request a Consultation";
  data.solutionCTA.title = "If you are unsure\nwhat treatment you need,\nplease visit Blanche";
  data.solutionCTA.description = "We propose custom solutions\nthrough accurate diagnosis.\n\nFeel free to consult your concerns.";
  data.solutionCTA.designElements.box = "We craft\nsmiles\nlike art";
  data.solutionCTA.designElements.text = "At Blanche,\nstart your\ntransformation";
  data.solutionCTA.title1 = "If you are unsure";
  data.solutionCTA.title2 = "what treatment you need,";
  data.solutionCTA.title3 = "please visit Blanche";
  data.solutionCTA.brandSlogan1 = "We craft\nsmiles\nlike art";
  data.solutionCTA.brandSlogan2 = "At Blanche,\nstart your\ntransformation";
}

fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Successfully updated en.json with native English translations for the actual Treatments page.');
