document.addEventListener("DOMContentLoaded", function () {
  
  // ==============================
  // 1. Lógica dos Modais (Abrir / Fechar)
  // ==============================
  const openModalButtons = document.querySelectorAll(".open-modal");
  const closeButtons = document.querySelectorAll(".close-button");
  const modals = document.querySelectorAll(".modal");

  // Abrir Modal
  openModalButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); 
      const modalId = this.dataset.modal; 
      const targetModal = document.getElementById(modalId);

      if (targetModal) {
        targetModal.classList.add("active"); 
        document.body.style.overflow = "hidden"; // Trava o scroll do fundo
      }
    });
  });

  // Fechar Modal pelo botão X
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal"); 
      if (modal) {
        modal.classList.remove("active"); 
        document.body.style.overflow = ""; // Destrava o scroll
      }
    });
  });

  // Fechar Modal clicando no fundo escuro (fora da caixinha)
  modals.forEach((modal) => {
    modal.addEventListener("click", function (event) {
      if (event.target === this) {
        this.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  // Fechar com a tecla ESC
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      modals.forEach((modal) => {
        if (modal.classList.contains("active")) {
          modal.classList.remove("active");
          document.body.style.overflow = "";
        }
      });
    }
  });

  // ==============================
  // 2. Lógica do Tema Claro/Escuro (LocalStorage)
  // ==============================
  const themeToggleButton = document.getElementById("theme-toggle");
  const body = document.body;
  const localStorageKey = "themePreference";

  function applySavedTheme() {
    const savedTheme = localStorage.getItem(localStorageKey);
    if (savedTheme === "dark") {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }

  applySavedTheme();

  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
      if (body.classList.contains("dark-mode")) {
        localStorage.setItem(localStorageKey, "dark");
      } else {
        localStorage.setItem(localStorageKey, "light");
      }
    });
  }

  // ==============================
  // 3. Lógica das Abas Principais (Tabs)
  // ==============================
  const tabButtons = document.querySelectorAll('.tab-btn');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal-content');
      
      // Remove classes ativas deste bloco modal
      modal.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      modal.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

      // Ativa a aba clicada
      this.classList.add('active');
      const targetId = this.getAttribute('data-target');
      modal.querySelector(`#${targetId}`).classList.add('active');
    });
  });

  // ==============================
  // 4. Lógica das Sub-abas (Portfólio de Projetos Elétricos)
  // ==============================
  const subTabButtons = document.querySelectorAll(".sub-tab-btn");

  subTabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const container = this.closest(".sub-portfolio-container");
      const targetSubId = this.dataset.subtarget;

      // Remove classes sub-ativas do container correspondente
      container.querySelectorAll(".sub-tab-btn").forEach((btn) => btn.classList.remove("sub-active"));
      container.querySelectorAll(".sub-tab-content").forEach((content) => content.classList.remove("sub-active"));

      // Ativa sub-aba clicada
      this.classList.add("sub-active");
      const targetContent = container.querySelector(`#${targetSubId}`);
      if (targetContent) {
        targetContent.classList.add("sub-active");
      }
    });
  });
});