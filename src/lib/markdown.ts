const rules = [
  //header rules
  [/#{3}\s?([^\n]+)/g, "<h6>$1</h6>"],
  [/#{2}\s?([^\n]+)/g, "<h5>$1</h5>"],
  [/#\s?([^\n]+)/g, `<h4 class="mt-3">$1</h4>`],

  //bold, italics and paragragh rules
  [/\*\*([^*]+)\*\*/g, `<b>$1</b>`],

  // br
  [/([^\n]+\n?)/g, "<p>$1</p>"],

  // break
  [/\n/g, "<br />"],

  //links
  [
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (match, text, href) => {
      const isEmail = /\S+@\S+\.\S+/.test(href);
      if (isEmail) {
        href = `mailto:${href}`;
      }
      return `<span class="inline-flex"><a href="${href}" target="_blank" class="underline hover:text-gray-300">${text}</a></span>`;
    },
  ],

  //highlights
  [
    /(`)(\s?[^\n,]+\s?)(`)/g,
    '<a class="bg-yellow-400 px-2 rounded-md py-1">$2</a>',
  ],

  //Image
  [
    /!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g,
    '<img src="$2" alt="$1" title="$3" />',
  ],
];

export default function () {
  return {
    update(el) {
      let html = el.textContent;
      rules.forEach(([rule, template]) => {
        html = html.replace(rule, template);
      });
      el.innerHTML = html;
    },
  };
}
