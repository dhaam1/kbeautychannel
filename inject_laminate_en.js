const fs = require('fs');
const enPath = './src/messages/en.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

enData.solution.laminate.faq = {
  "title": "FAQ",
  "mainTitle": "Everything you wonder\nabout laminates, answered clearly",
  "items": [
    {
      "question": "How is Blanche different\nfrom general laminates?",
      "answer": "answer_rich_handled_in_component",
      "answer_p1": "Blanche is not just a prosthetic that covers your teeth; it is a customized design that brings out your unique beauty.",
      "answer_p2": "At Blanche, an expert ceramist handles the entire process directly, from consultation to crafting and final attachment."
    },
    {
      "question": "Since it's thin, doesn't it break easily?\nHow long can it last?",
      "answer": "Although Blanche laminates are ultra-thin, we use high-strength ceramics that offer outstanding durability. With proper care and regular checkups, they can last over 10 years, and there are absolutely no issues with daily eating."
    },
    {
      "question": "Won't my gums swell\nor smell after the procedure?",
      "answer": "Blanche laminates are performed with zero or absolute minimal grinding, so gum irritation is virtually nonexistent. In addition, precise custom crafting optimizes the contact surface with the gums, leaving almost no side effects."
    },
    {
      "question": "Can I replace laminates done\nelsewhere with Blanche?",
      "answer": "Yes, it is possible. After safely removing the existing laminates, we can replace them with Blanche laminates. We will first check your current condition through a consultation and propose the most optimal replacement plan."
    },
    {
      "question": "How do I care for them\nafter the procedure?",
      "answer": "Standard brushing and flossing are entirely sufficient. However, we recommend avoiding chewing on extremely hard foods or ice, and visiting for regular checkups."
    },
    {
      "question": "How long does the\ncrafting process take?",
      "answer": "To ensure hyper-precise custom crafting, Blanche laminates take about 2-3 weeks. Including pre-procedure consultation and design, the total period requires around 3-4 weeks."
    }
  ],
  "comparison": {
    "headers": [
      "Category",
      "General Laminate",
      "Blanche"
    ],
    "rows": [
      [
        "Tooth Prep",
        "Over 0.5mm grinding",
        "Zero grinding or ~0.1mm refinement"
      ],
      [
        "Crafting Method",
        "Outsourced to external lab",
        "Crafted directly in in-house lab"
      ],
      [
        "Design",
        "Uniformly white teeth",
        "Personalized, natural custom design"
      ],
      [
        "Durability",
        "Simple adhesive method",
        "Chemical bonding with the tooth"
      ]
    ]
  }
};

enData.solution.laminate.ctaSection = {
  "label": "Book a Consultation",
  "title": "A smile for a lifetime,\ncrafted by Blanche",
  "description": "The choice to protect your teeth.\nWe thoroughly analyze your condition\nand explain every detail transparently.\n\nFor any dental concerns, visit Blanche.",
  "boxText": "Where\na smile\nbecomes art",
  "footerText": "Your transformation\nbegins at Blanche"
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2) + '\n', 'utf8');
console.log('Successfully injected translated FAQ and CTA into en.json');
