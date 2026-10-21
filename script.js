const projects = [
  {name:"Bola na Comunidade", region:"Zona Leste", ages:["sub13","sub15"], ageLabel:"10 a 15 anos", focus:"Treinos de fundamentos, convivência e atividades em grupo.", tag:"FUTEBOL DE BASE"},
  {name:"Campo de Oportunidades", region:"Zona Sul", ages:["sub15","sub17"], ageLabel:"13 a 17 anos", focus:"Prática esportiva, disciplina e acompanhamento educacional.", tag:"ESPORTE E EDUCAÇÃO"},
  {name:"Primeiro Toque", region:"Zona Norte", ages:["sub13"], ageLabel:"8 a 13 anos", focus:"Coordenação motora, iniciação esportiva e trabalho em equipe.", tag:"INICIAÇÃO ESPORTIVA"}
];

const grid = document.getElementById("projectGrid");
const searchInput = document.getElementById("searchInput");
const ageFilter = document.getElementById("ageFilter");
const emptyState = document.getElementById("emptyState");

function renderProjects() {
  const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const age = ageFilter.value;
  const filtered = projects.filter(project =>
    (project.name + " " + project.region + " " + project.focus).toLocaleLowerCase("pt-BR").includes(query) &&
    (!age || project.ages.includes(age))
  );
  grid.innerHTML = filtered.map(project => `
    <article class="project-card">
      <span class="card-tag">${project.tag}</span>
      <h3>${project.name}</h3>
      <p>${project.focus}</p>
      <div class="card-meta"><span>⌖ ${project.region}</span><span>${project.ageLabel}</span></div>
    </article>`).join("");
  emptyState.hidden = filtered.length !== 0;
}
searchInput.addEventListener("input", renderProjects);
ageFilter.addEventListener("change", renderProjects);
renderProjects();

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const opened = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const feedback = document.getElementById("formFeedback");
  if (!name || !email || !message) {
    feedback.textContent = "Preencha todos os campos para validar a mensagem.";
    return;
  }
  feedback.textContent = `Obrigado, ${name}! Os campos foram validados. Esta demonstração não envia dados.`;
  event.target.reset();
});
