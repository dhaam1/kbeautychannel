const fs = require('fs');
const path = 'c:/Users/김승연/OneDrive/Desktop/blanche-backend-main/blanche-backend-main/src/messages/en.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// We overwrite data.implant with the translated object.
if (!data.implant) data.implant = {};

data.implant.title = "Blanche Implant | Blanche Dental Clinic - No-Prep Laminate";
data.implant.description = "Gangnam Blanche Dental Clinic with 30,000 implant cases. Experience safe, pain-free sleep implants by Seoul National University specialists.";

if(data.implant.hero) {
  data.implant.hero.title = "Implants";
  data.implant.hero.subtitle = "Korea's Master of Implants\nBlanche's Exclusive Protocol";
  data.implant.hero.button = "Book Consultation";
}

if(data.implant.banner) {
  data.implant.banner.message = "Healthier, longer-lasting\nartificial teeth. Reclaim your\ndaily joy with implants.";
}

if(data.implant.philosophy) {
  data.implant.philosophy.topText = ["10 years ago,", "we placed implants", "for our own father"];
  data.implant.philosophy.bottomText.mobile = ["With that same heart,", "we promise to treat", "your missing teeth", "with our absolute best."];
  data.implant.philosophy.bottomText.desktop = ["With that same heart,", "we promise to treat your missing teeth", "with our absolute best."];
}

if(data.implant.expertise) {
  data.implant.expertise.label = "Implant Expertise";
  data.implant.expertise.title.mobile = "Implants:\nExperience, environment, and care\ndetermine a lifespan\nlasting over 20 years.";
  data.implant.expertise.title.desktop = "Implants: Experience, environment, and care\ndetermine a lifespan lasting over 20 years.";
  data.implant.expertise.columns[0].title = "Top 100 Masters";
  data.implant.expertise.columns[0].items = ["Over 30,000 placements", "Selected Top 100 Masters in Korea", "SNU specialist medical team"];
  data.implant.expertise.columns[1].title = "University-Grade Facility";
  data.implant.expertise.columns[1].items = ["Precision analysis system", "Custom crafting equipment", "Safe sleep & anesthesia system"];
  data.implant.expertise.columns[2].title = "Maintenance Program";
  data.implant.expertise.columns[2].items = ["Regular checkup system", "Implant warranty provided", "Thorough aftercare support"];
}

if(data.implant.location) {
  data.implant.location.label = "What is an Implant?"; 
  data.implant.location.title.mobile = "Planting an artificial root\nto replace a\nmissing tooth";
  data.implant.location.title.desktop = "Planting an artificial root\nto replace a missing tooth";
  data.implant.location.description.mobile = "An implant is a procedure\nwhere an artificial root is placed\ninto the jawbone, covered by\na crown resembling a natural tooth.\nIt replaces natural teeth,\nand with proper surgery,\nlasts over 20 years.";
  data.implant.location.description.desktop = "An implant is a procedure where an artificial root is placed\ninto the jawbone, covered by a crown resembling a natural tooth.\nIt replaces natural teeth, and with proper surgery,\nlasts over 20 years.";
  data.implant.location.differenceTitle = "Difference from Bridges & Dentures";
  data.implant.location.differenceDesc.mobile = "Bridges require grinding nearby teeth,\nand dentures cause\nunnecessary irritation,\nbut implants have no such flaws.";
  data.implant.location.differenceDesc.desktop = "Bridges require grinding nearby teeth,\nand dentures cause unnecessary irritation,\nbut implants have no such flaws.";

  data.implant.location.implant.title = "Implant";
  data.implant.location.implant.alt = "Blanche implant structure explanation";
  data.implant.location.implant.table[0].label = "Fixation"; data.implant.location.implant.table[0].value = "Fixed to bone, no shaking";
  data.implant.location.implant.table[1].label = "Chewing Force"; data.implant.location.implant.table[1].value = "80-90% of natural teeth";
  data.implant.location.implant.table[2].label = "Care"; data.implant.location.implant.table[2].value = "Brushing + regular checkups";
  data.implant.location.implant.table[3].label = "Lifespan"; data.implant.location.implant.table[3].value = "Semi-permanent with care";

  data.implant.location.denture.title = "Standard Denture";
  data.implant.location.denture.alt = "Standard denture image";
  data.implant.location.denture.table[0].label = "Fixation"; data.implant.location.denture.table[0].value = "Rests on top of gums";
  data.implant.location.denture.table[1].label = "Chewing Force"; data.implant.location.denture.table[1].value = "20-30% of natural teeth";
  data.implant.location.denture.table[2].label = "Care"; data.implant.location.denture.table[2].value = "Daily removal and washing";
  data.implant.location.denture.table[3].label = "Lifespan"; data.implant.location.denture.table[3].value = "Remade every 5-7 years";

  data.implant.location.banner.mobile = "Healthier, longer-lasting\nartificial teeth. Reclaim your\ndaily joy with implants.";
  data.implant.location.banner.desktop = "Healthier, longer-lasting\nartificial teeth. Reclaim your\ndaily joy with implants.";
}

if(data.implant.tabs) {
  data.implant.tabs.label = "Implant Types";
  data.implant.tabs.subtitle = "Whatever the condition,\nwe provide the most reasonable procedure tailored to the patient.";

  data.implant.tabs.items.digital.label = "Digital Full Arch Implant";
  data.implant.tabs.items.digital.title = "Digital Full Arch Implant";
  data.implant.tabs.items.digital.description = "Recover all teeth\nwithout the hassle of dentures.\n\nA fixed implant\nfor those who lost all teeth\n거나 or whose teeth are all shaking.\n\nA highly advanced procedure\nrestoring the function of all teeth\nwith a minimal number of implants (4-6).";
  data.implant.tabs.items.digital.features[0].title = "Recommended For";
  data.implant.tabs.items.digital.features[0].items = ["Lacking jawbone", "Uncomfortable with dentures", "Unable to get full implants"];
  data.implant.tabs.items.digital.features[1].title = "Key Benefits";
  data.implant.tabs.items.digital.features[1].items = ["Fewer implants lower cost burden", "Eating possible on surgery day", "Bone graft often skippable"];
  data.implant.tabs.items.digital.duration = ["Completed within 2 weeks to 3 months"];
  data.implant.tabs.items.digital.tech = ["1. Placed accurately using 3D CT + oral scanners.", "2. Designed and crafted quickly in our in-house lab.", "3. Temporary teeth attached on surgery day to reduce discomfort."];
  data.implant.tabs.items.digital.cases.label = "Treatment Cases";
  data.implant.tabs.items.digital.cases.guide = "Drag the screen to compare before and after";
  data.implant.tabs.items.digital.cases.items[0].title = "60s Patient, All Upper Teeth Missing";
  data.implant.tabs.items.digital.cases.items[0].description = "\"Eating feels so comfortable\nand my pronunciation stabilized.\"";
  data.implant.tabs.items.digital.cases.items[1].title = "60s, Treated After Extracting Upper Teeth";
  data.implant.tabs.items.digital.cases.items[1].description = "\"My upper teeth used to shake\nbut now it's incredibly comfortable.\"";
  data.implant.tabs.items.digital.cases.items[2].title = "70s Male, Full Arch Implant (Lower)";
  data.implant.tabs.items.digital.cases.items[2].description = "";
  data.implant.tabs.items.digital.cases.items[3].title = "70s Female, Full Arch Implant (Both)";
  data.implant.tabs.items.digital.cases.items[3].description = "";

  data.implant.tabs.items.all.label = "Full Implants";
  data.implant.tabs.items.all.title = "Full Implants";
  data.implant.tabs.items.all.description = "A treatment for those who lost all teeth\nor whose remaining teeth cannot function.\n\nUnlike removable dentures,\nimplants are fixed securely\ninto the jawbone.";
  data.implant.tabs.items.all.features[0].title = "Recommended For";
  data.implant.tabs.items.all.features[0].items = ["Lost most of their teeth", "Dentures hurt or keep falling out", "Remaining teeth won't last long"];
  data.implant.tabs.items.all.features[1].title = "Key Benefits";
  data.implant.tabs.items.all.features[1].items = ["80-90% chewing force of natural teeth", "Prevents jawbone loss", "Improves face shape & pronunciation"];
  data.implant.tabs.items.all.duration = ["3-6 months, including temporary teeth phase"];
  data.implant.tabs.items.all.tech = ["1. Designed by precisely analyzing bone and nerves with 3D CT.", "2. Planned considering chewing height and facial balance."];
  data.implant.tabs.items.all.cases.label = "Treatment Cases";
  data.implant.tabs.items.all.cases.guide = "Drag the screen to compare before and after";
  data.implant.tabs.items.all.cases.items[0].title = "Late 70s Male, Visited from USA";
  data.implant.tabs.items.all.cases.items[0].description = "\"I feel younger just from having teeth again.\"";
  data.implant.tabs.items.all.cases.items[1].title = "Late 50s Male, Visited from Daegu";
  data.implant.tabs.items.all.cases.items[1].description = "\"I smile with confidence and enjoy eating again.\"";
  data.implant.tabs.items.all.cases.items[2].title = "50s Male, Full Implants (Upper)";
  data.implant.tabs.items.all.cases.items[2].description = "";

  data.implant.tabs.items.incisionless.label = "Incisionless Implants";
  data.implant.tabs.items.incisionless.title = "Incisionless Implants";
  data.implant.tabs.items.incisionless.description = "Blanche's 'incisionless precision placement'\nminimizing pain, bleeding, and swelling.\n\nPlacing by accessing only\nthe minimal required area\nwithout large incisions.\n\nTaking just 2-3 minutes per implant,\nit's comfortable enough to dine out\nor meet people on surgery day.";
  data.implant.tabs.items.incisionless.features[0].title = "Recommended For";
  data.implant.tabs.items.incisionless.features[0].items = ["Vaguely afraid of first implants", "Afraid of retreatment", "Cannot endure long procedures"];
  data.implant.tabs.items.incisionless.features[1].title = "Key Benefits";
  data.implant.tabs.items.incisionless.features[1].items = ["Small incisions reduce pain and swelling", "Minimized suturing speeds recovery", "Daily life possible on surgery day"];
  data.implant.tabs.items.incisionless.duration = ["2-3 mins per implant, daily life possible same-day"];
  data.implant.tabs.items.incisionless.tech = ["1. Placed optimally by checking jawbone beforehand with 3D CT.", "2. Surgery time shortened using dedicated incisionless implants.", "3. Chosen only after CT diagnosis confirms suitability."];
  data.implant.tabs.items.incisionless.cases.label = "Treatment Cases";
  data.implant.tabs.items.incisionless.cases.guide = "Drag the screen to compare before and after";
  data.implant.tabs.items.incisionless.cases.items[0].title = "50s Female / Visited from Suburbs";
  data.implant.tabs.items.incisionless.cases.items[0].description = "\"The anxiety when chewing is gone,\nand I don't have to chew on one side only anymore.\"";
  data.implant.tabs.items.incisionless.cases.items[1].title = "Late 40s Female / Office Worker";
  data.implant.tabs.items.incisionless.cases.items[1].description = "\"Without the burden of cut gums,\nit went by much more comfortably than expected.\"";

  data.implant.tabs.items.navi.label = "Navigation Implants";
  data.implant.tabs.items.navi.title = "Navigation Implants";
  data.implant.tabs.items.navi.description = "Placed more accurately and safely.\n\nPlanning the placement location and angle\nin advance based on 3D CT and oral scanner data,\nand placing it exactly as planned.\n\nNavigation is not just a \"technique for no incisions\",\nbut a tool enhancing safety and predictability.";
  data.implant.tabs.items.navi.features[0].title = "Recommended For";
  data.implant.tabs.items.navi.features[0].items = ["Placing multiple implants at once", "Complex cases with collapsed bite", "Desiring more accurate placement"];
  data.implant.tabs.items.navi.features[1].title = "Key Benefits";
  data.implant.tabs.items.navi.features[1].items = ["Safely avoids nerve canals", "Selects optimal location with thick bone", "Same-day temporary teeth possible"]
  data.implant.tabs.items.navi.duration = ["Surgery around 30-40 mins", "Lower jaw under 1 hr including anesthesia"];
  data.implant.tabs.items.navi.tech = ["1. 3D printed surgical guides built after precise 3D CT analysis.", "2. Guided surgery based on Osstem OneGuide.", "3. Designed considering the final prosthetic location."];
  data.implant.tabs.items.navi.cases.label = "Treatment Cases";
  data.implant.tabs.items.navi.cases.guide = "Drag the screen to compare before and after";
  data.implant.tabs.items.navi.cases.items[0].title = "50s Male / Multiple Implants";
  data.implant.tabs.items.navi.cases.items[0].description = "\"Seeing exactly where and how it goes beforehand\nmade the results feel very predictable.\"";
  data.implant.tabs.items.navi.cases.items[1].title = "Early 50s Female / Multiple Posterior Implants";
  data.implant.tabs.items.navi.cases.items[1].description = "\"Confirming the placement beforehand\nrelieved a lot of my anxiety.\"";
}

if(data.implant.ctaSection) {
  data.implant.ctaSection.mobile = "Maintaining it long-term is\nmore important than placing it.\nBlanche Dental Clinic will be\nyour lifelong doctor.";
  data.implant.ctaSection.desktop = "Maintaining it long-term is more important than placing it.\nBlanche Dental Clinic will be your lifelong doctor.";
  data.implant.ctaSection.sectionLabel = "Request a Consultation";
  data.implant.ctaSection.sectionTitle = "A smile lasting a lifetime,\nBlanche will craft it for you";
  data.implant.ctaSection.description = "A choice to protect your teeth,\nfor that choice, we meticulously analyze\nand transparently explain your condition.\n\nFor dental concerns, please visit Blanche.";
  data.implant.ctaSection.designElements.box = "We craft\nsmiles\nlike art";
  data.implant.ctaSection.designElements.text = "At Blanche,\nstart your\ntransformation";
}

if(data.implant.ctaForm) {
  data.implant.ctaForm.label = "Request a Consultation";
  data.implant.ctaForm.title = ["Aiming for implants\n", "lasting over 20 years\n", "Choose after thorough consultation"];
  data.implant.ctaForm.description = "Blanche Dental Clinic helps you judge\nby advising the best direction for\nyour current teeth and gum condition.\n\nFor detailed consultation,\nplease visit us anytime.";
  data.implant.ctaForm.designElements.box = "We craft\nsmiles\nlike art";
  data.implant.ctaForm.designElements.text = "At Blanche,\nstart your\ntransformation";
}

if(data.implant.recommendation) {
  data.implant.recommendation.label = "Implant Brands";
  data.implant.recommendation.title = "Blanche Dental Clinic uses only\n100% genuine verified brands";
  data.implant.recommendation.brands[0].name = "Straumann";
  data.implant.recommendation.brands[0].description = "The #1 global seller, the epitome of Swiss precision engineering. With an unrivaled surface treatment, it bonds to bone faster and boasts superior long-term stability.";
  data.implant.recommendation.brands[0].features = ["Applies SLA special surface treatment", "Can be placed in thicknesses under 5mm", "Lowest rate of peri-implantitis"];
  data.implant.recommendation.brands[0].alt = "Straumann implant image";

  data.implant.recommendation.brands[1].name = "Osstem";
  data.implant.recommendation.brands[1].description = "The #1 brand in Korea, chosen by the most dentists. Optimized for Korean oral structures with massive clinical data for reliability.";
  data.implant.recommendation.brands[1].features = ["Shortens treatment periods", "Various types for custom fitting", "High resistance to foreign matter"];
  data.implant.recommendation.brands[1].alt = "Osstem implant image";

  data.implant.recommendation.brands[2].name = "Megagen";
  data.implant.recommendation.brands[2].description = "The #1 European export, boasting powerful fixation. Even in weak or thin bone, its unique thread design secures it durably.";
  data.implant.recommendation.brands[2].features = ["Fast bone regeneration and high success rate", "Patented robust placement technology", "High accuracy with 3D procedures"];
  data.implant.recommendation.brands[2].alt = "Megagen implant image";
}

if(data.implant.design) {
  data.implant.design.label = "Implant Design";
  data.implant.design.title.mobile = "For lasting, healthy implants\nBlanche Dental Clinic considers\n'design' before 'surgery'.";
  data.implant.design.title.desktop = "For lasting, healthy implants\nBlanche Dental Clinic considers 'design' before 'surgery'.";
  data.implant.design.columns[0].title = "Precise Diagnosis";
  data.implant.design.columns[0].description = "Accurately analyzing bone condition\nwith precise CT and 3D simulation.";
  data.implant.design.columns[1].title = "Custom Design";
  data.implant.design.columns[1].description = "Planning treatment reflecting\nfunction and aesthetics in harmony\nwith aesthetic prosthetics.";
  data.implant.design.columns[2].title = "Maintenance";
  data.implant.design.columns[2].description = "Establishing a customized care program\nto enhance long-term implant stability.";
}

if(data.implant.sleep) {
  data.implant.sleep.label = "Sleep Implants";
  data.implant.sleep.title.mobile = "Completing implants\nin a comfortable sleep state\nwithout worrying about pain.";
  data.implant.sleep.title.desktop = "Completing implants\nin a comfortable sleep state without worrying about pain.";
  data.implant.sleep.columns[0].title = "Safe Sleep System";
  data.implant.sleep.columns[0].description = "Planning custom sleep therapy with pre-diagnosis, and ensuring safety via real-time monitoring of oxygen, heart rate, and blood pressure.";
  data.implant.sleep.columns[1].title = "Conscious Sedation";
  data.implant.sleep.columns[1].description = "Unlike general anesthesia, which requires artificial respiration, this maintains spontaneous breathing in a light sleep state without straining the body.";
  data.implant.sleep.columns[2].title = "Min Dose - Max Sedation";
  data.implant.sleep.columns[2].description = "Proceeding with a safe combination of Midazolam and Ketamine, strictly following dosage to prevent side effects.";
  data.implant.sleep.faq.title = "Frequently Asked Questions";
  data.implant.sleep.faq.mainTitle = "Things you wonder\nbefore sleep care,\nBlanche answers them";
  data.implant.sleep.faq.items[0].question = "Is there any preparation required for sleep dentistry?";
  data.implant.sleep.faq.items[0].answer = "Usually, fasting for 6 hours before treatment is required. Wear comfortable clothing. Because drowsiness may persist, avoid driving alone and come with a guardian.";
  data.implant.sleep.faq.items[1].question = "Is sleep dentistry different from general anesthesia? Isn't it dangerous?";
  data.implant.sleep.faq.items[1].answer = "Yes, it is different. Blanche uses 'conscious sedation' where you can breathe independently and respond to stimuli. It carries significantly less physical burden than general anesthesia and assures fast recovery.";
  data.implant.sleep.faq.items[2].question = "Can I wake up during the treatment?";
  data.implant.sleep.faq.items[2].answer = "Consciousness may briefly return depending on your reaction to the medication. If so, medical staff will safely adjust the dosage to return you to a comfortable state, so there's no need to worry.";
  data.implant.sleep.faq.items[3].question = "Do I feel absolutely no pain during sleep dentistry?";
  data.implant.sleep.faq.items[3].answer = "You will barely feel any pain. We combine conscious sedation with local anesthesia to minimize pain. Some pain may occur after waking up, which is manageable with prescribed medication.";
  data.implant.sleep.faq.items[4].question = "Are there side effects after sleep dentistry?";
  data.implant.sleep.faq.items[4].answer = "Temporary dizziness, drowsiness, or nausea may occur right after, but naturally disappear within a few hours. For safety, avoid driving or operating machinery on the day of surgery.";
  data.implant.sleep.faq.items[5].question = "Are the medications used safe?";
  data.implant.sleep.faq.items[5].answer = "The sedatives Midazolam and Ketamine are proven safe. Blanche Dental Clinic monitors vital signs (oxygen, heart rate, blood pressure) in real-time and takes appropriate safety measures when necessary.";
}

if(data.implant.process) {
  data.implant.process.label = "Implant Process";
  data.implant.process.title = "Blanche's Systematic\n5-Step Implant Process";
  data.implant.process.steps[0].title = "Precise Diagnosis & Consultation";
  data.implant.process.steps[0].description = "Analyzing bone precisely with 3D CT and scanners, and establishing a 1:1 tailored plan considering your health.";
  data.implant.process.steps[1].title = "1st Surgery (Placement)";
  data.implant.process.steps[1].description = "Placing the artificial root precisely at the planned location. Required bone grafting is done concurrently.";
  data.implant.process.steps[2].title = "Osseointegration & Healing";
  data.implant.process.steps[2].description = "The period where the implant firmly bonds with the jawbone. Depending on the individual, it takes about 2 to 6 months.";
  data.implant.process.steps[3].title = "2nd Surgery & Prosthetics";
  data.implant.process.steps[3].description = "Refining the gums, connecting the abutment, and attaching the final crown crafted to harmonize with surrounding teeth.";
  data.implant.process.steps[4].title = "Regular Checkups & Care";
  data.implant.process.steps[4].description = "Meticulous aftercare is essential for semi-permanent use. Regular scaling and exams prevent peri-implantitis.";
}

if(data.implant.director) {
  data.implant.director.label = "Chief Director Introduction";
  data.implant.director.title = "With 30,211 placement cases,\nBlanche Dental Clinic excels\neven in difficult, complex cases";
  data.implant.director.description.mobile = "We promise the most ideal results\nbased on extensive advisory activities\nand overwhelming clinical data.";
  data.implant.director.description.desktop = "We promise the most ideal results\nbased on extensive advisory activities and overwhelming clinical data.";
  data.implant.director.doctorAlt = "Chief Director";
  data.implant.director.slogan = "Nothing is impossible";
  data.implant.director.award = "Selected Top 100 Masters in Korea 'Implant Division'";
  data.implant.director.achievements = [
    "Selected Top 100 Masters in Korea 'Implant Division'",
    "Ranked #1 in Gangnam for Straumann implant placements",
    "Official clinical advisor & appointed by Top 4 global implant makers",
    "Straumann Official Clinical Advisory Clinic",
    "Osstem Official Clinical Advisory Clinic",
    "Megagen Official Clinical Advisory Clinic",
    "Dentium Official Clinical Advisory Clinic"
  ];
  data.implant.director.doctorInfo = "Seoul National University Alumni,\nUS Columbia Dental Hospital,\nUCLA Dental Hospital Training";
  data.implant.director.doctorName = "Chief Director Kim Tae-hyung";
  data.implant.director.signatureAlt = "Kim Tae-hyung signature";
}

if(data.implant.cta) {
  data.implant.cta.title = "Maintaining it long-term is more important than placing it. Blanche will be your lifelong doctor.";
  data.implant.cta.button = "Consult on KakaoTalk";
}

if(data.implant.equipment) {
  data.implant.equipment.title = "Implant Treatment Equipment";
  data.implant.equipment.subtitle = "Precise digital equipment\nallowing zero 0.1mm error";
  data.implant.equipment.description = "Promising satisfying results\nwith minimal visits using\nfast and precise diagnostic tools.";
  data.implant.equipment.items[0].headline = "CT equipment enabling convenient, fast, and precise scanning with a premium 3D camera.";
  data.implant.equipment.items[0].description = "CT equipment enabling convenient, fast, and precise scanning with a premium 3D camera.";
  data.implant.equipment.items[0].alt = "Blanche Dentium Bright 3D CT";

  data.implant.equipment.items[1].headline = "Equipment enabling more accurate and faster scanning without the hassle of molding.";
  data.implant.equipment.items[1].description = "Equipment enabling more accurate and faster scanning without the hassle of molding.";
  data.implant.equipment.items[1].alt = "Blanche Prime Scan equipment";

  data.implant.equipment.items[2].headline = "Milling equipment offering excellent efficiency with high speed and precision.";
  data.implant.equipment.items[2].description = "Milling equipment offering excellent efficiency with high speed and precision.";
  data.implant.equipment.items[2].alt = "Blanche Inlab MC-XL equipment";

  data.implant.equipment.items[3].headline = "High-quality lab equipment capable of precise temperature control.";
  data.implant.equipment.items[3].description = "High-quality lab equipment capable of precise temperature control.";
  data.implant.equipment.items[3].alt = "Blanche Inlab Profire equipment";

  data.implant.equipment.items[4].headline = "Lab equipment capable of precisely and stably firing and pressing ceramic prosthetics.";
  data.implant.equipment.items[4].description = "Lab equipment capable of precisely and stably firing and pressing ceramic prosthetics.";
  data.implant.equipment.items[4].alt = "Blanche Ivoclar equipment";

  data.implant.equipment.items[5].headline = "Comfortable dental care without pain from anesthesia onwards.";
  data.implant.equipment.items[5].description = "Comfortable dental care without pain from anesthesia onwards.";
  data.implant.equipment.items[5].alt = "Blanche Slow Jec equipment";

  data.implant.equipment.items[6].headline = "Local anesthesia system minimizing pain implemented with DHT's precise technology.";
  data.implant.equipment.items[6].description = "Local anesthesia system minimizing pain implemented with DHT's precise technology.";
  data.implant.equipment.items[6].alt = "Blanche Quicksleep5 equipment";
}

if(data.implant.faq) {
  data.implant.faq.title = "Frequently Asked Questions";
  data.implant.faq.mainTitle = "Things you wonder\nbefore implant consults,\nBlanche answers them";
  data.implant.faq.items[0].question = "Is implant surgery painful?";
  data.implant.faq.items[0].answer = "The surgery is performed under local anesthesia, so you will barely feel any pain.\nSome discomfort may occur as the anesthesia wears off,\nbut it is fully manageable with prescribed painkillers.\nMost return to daily life within 1-2 days.";
  data.implant.faq.items[1].question = "How long do implants last?";
  data.implant.faq.items[1].answer = "With proper care, they can be used semi-permanently.\nThe lifespan depends on oral hygiene, overall health, and regular checkups.\nRegular scaling and exams are essential to prevent peri-implantitis.";
  data.implant.faq.items[2].question = "How many implants can I get?";
  data.implant.faq.items[2].answer = "Depending on bone condition, you can get up to 28.\nApplicable to various cases from single to full tooth loss.\nFor edentulous patients, the All-on-4 or All-on-6 methods\ncan restore the entire dentition with fewer implants.";
  data.implant.faq.items[3].question = "How much do implants cost?";
  data.implant.faq.items[3].answer = "It varies depending on materials, surgical complexity, and the doctor's experience.\nSeniors over 65 can receive health benefits in Korea.\nExact costs will be guided through consultation.";
  data.implant.faq.items[4].question = "Should I quit smoking before getting implants?";
  data.implant.faq.items[4].answer = "Yes, quitting is strongly recommended.\nSmoking decreases blood flow to gums and bone, slowing recovery\nand increasing the risk of peri-implantitis.\nMaintaining a smoke-free state is crucial to success.";
  data.implant.faq.items[5].question = "What is peri-implantitis?";
  data.implant.faq.items[5].answer = "It is an inflammatory disease in the gums and bone around the implant.\nIt can occur if oral hygiene is neglected,\nand if untreated, bone loss can cause the implant to fall out.\nRegular checkups and hygiene care are essential for prevention.";
}

fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Successfully updated en.json with native English translations for Implant.');
