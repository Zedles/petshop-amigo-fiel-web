/* ==========================================================================
   PetShop Amigo Fiel - Scripts JavaScript (Fase 2)
   Funcionalidades:
   1. Funções temporais (relógio em tempo real, status da loja e aviso temporizado)
   2. Recursos de acessibilidade (Alto Contraste e ajuste de tamanho de fonte)
   3. Validação, máscaras e agendamento dinâmico no formulário
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    inicializarRelogioEStatus();
    inicializarAcessibilidade();
    inicializarAvisoPromocional();
    inicializarFormularioAgendamento();
});

/* --------------------------------------------------------------------------
   1. Função Temporal: Relógio em tempo real e status Aberto/Fechado (setInterval)
   -------------------------------------------------------------------------- */
function inicializarRelogioEStatus() {
    const elRelogio = document.getElementById("relogio-loja");
    const elStatus = document.getElementById("status-loja");
    if (!elRelogio || !elStatus) return;

    function atualizar() {
        const agora = new Date();
        const horaFormatada = agora.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        const dataFormatada = agora.toLocaleDateString("pt-BR");
        elRelogio.textContent = `${dataFormatada} - ${horaFormatada}`;

        // Horário de funcionamento: Segunda (1) a Sábado (6), das 08h às 19h
        const dia = agora.getDay();
        const hora = agora.getHours();
        const aberto = dia >= 1 && dia <= 6 && hora >= 8 && hora < 19;

        if (aberto) {
            elStatus.textContent = "Aberto agora";
            elStatus.className = "badge bg-success ms-2";
        } else {
            elStatus.textContent = "Fechado no momento (Agende online)";
            elStatus.className = "badge bg-warning text-dark ms-2";
        }
    }

    atualizar();
    setInterval(atualizar, 1000);
}

/* --------------------------------------------------------------------------
   2. Função Temporal: Banner de boas-vindas exibido após 2 segundos (setTimeout)
   -------------------------------------------------------------------------- */
function inicializarAvisoPromocional() {
    const elAviso = document.getElementById("aviso-temporal");
    if (!elAviso) return;

    setTimeout(function () {
        elAviso.classList.remove("d-none");
    }, 2000);
}

/* --------------------------------------------------------------------------
   3. Acessibilidade: Alto Contraste e Ajuste de Fonte (A+ / A- / Padrão)
   -------------------------------------------------------------------------- */
function inicializarAcessibilidade() {
    const btnContraste = document.getElementById("btn-contraste");
    const btnAumentar = document.getElementById("btn-fonte-maior");
    const btnDiminuir = document.getElementById("btn-fonte-menor");
    const btnReset = document.getElementById("btn-fonte-padrao");

    // Restaura preferências salvas
    if (localStorage.getItem("petshop_contraste") === "ativo") {
        document.body.classList.add("high-contrast");
    }

    let escala = parseInt(localStorage.getItem("petshop_fonte") || "100", 10);
    document.documentElement.style.setProperty("--escala-fonte", escala + "%");

    if (btnContraste) {
        btnContraste.addEventListener("click", function () {
            document.body.classList.toggle("high-contrast");
            const ativo = document.body.classList.contains("high-contrast");
            localStorage.setItem("petshop_contraste", ativo ? "ativo" : "inativo");
        });
    }

    if (btnAumentar) {
        btnAumentar.addEventListener("click", function () {
            if (escala < 130) {
                escala += 10;
                document.documentElement.style.setProperty("--escala-fonte", escala + "%");
                localStorage.setItem("petshop_fonte", String(escala));
            }
        });
    }

    if (btnDiminuir) {
        btnDiminuir.addEventListener("click", function () {
            if (escala > 80) {
                escala -= 10;
                document.documentElement.style.setProperty("--escala-fonte", escala + "%");
                localStorage.setItem("petshop_fonte", String(escala));
            }
        });
    }

    if (btnReset) {
        btnReset.addEventListener("click", function () {
            escala = 100;
            document.documentElement.style.setProperty("--escala-fonte", "100%");
            localStorage.setItem("petshop_fonte", "100");
        });
    }
}

/* --------------------------------------------------------------------------
   4. Formulário de Cadastro (Cliente + Pet) e Agendamento de Serviços
   -------------------------------------------------------------------------- */
function inicializarFormularioAgendamento() {
    const form = document.getElementById("form-agendamento");
    if (!form) return;

    const inputData = document.getElementById("data-agendamento");
    const inputCpf = document.getElementById("cliente-cpf");
    const inputTelefone = document.getElementById("cliente-telefone");
    const elValorEstimado = document.getElementById("valor-estimado");
    const elResumo = document.getElementById("resumo-agendamento");

    // Define a data mínima do calendário como o dia atual
    if (inputData) {
        const hoje = new Date();
        const yyyy = hoje.getFullYear();
        const mm = String(hoje.getMonth() + 1).padStart(2, "0");
        const dd = String(hoje.getDate()).padStart(2, "0");
        inputData.min = `${yyyy}-${mm}-${dd}`;
    }

    // Máscara simples de CPF: 000.000.000-00
    if (inputCpf) {
        inputCpf.addEventListener("input", function (e) {
            let v = e.target.value.replace(/\D/g, "").slice(0, 11);
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            e.target.value = v;
        });
    }

    // Máscara simples de Telefone: (00) 00000-0000
    if (inputTelefone) {
        inputTelefone.addEventListener("input", function (e) {
            let v = e.target.value.replace(/\D/g, "").slice(0, 11);
            if (v.length > 10) {
                v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
            } else if (v.length > 5) {
                v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
            } else if (v.length > 2) {
                v = v.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
            }
            e.target.value = v;
        });
    }

    // Calcula o valor estimado dinamicamente conforme serviço, porte e tele-busca
    function calcularValor() {
        const chkBanho = document.getElementById("servico-banho").checked;
        const chkTosa = document.getElementById("servico-tosa").checked;
        const porte = document.getElementById("pet-porte").value;
        const metodo = document.querySelector('input[name="metodo-atendimento"]:checked');

        let total = 0;
        const multiplicadorGrande = porte === "medio_grande" ? 1 : 0;

        if (chkBanho && chkTosa) {
            total += multiplicadorGrande ? 130 : 95;
        } else if (chkBanho) {
            total += multiplicadorGrande ? 85 : 60;
        } else if (chkTosa) {
            total += multiplicadorGrande ? 70 : 50;
        }

        if (metodo && metodo.value === "tele-busca" && total > 0) {
            total += 20;
        }

        if (elValorEstimado) {
            elValorEstimado.textContent = total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });
        }
        return total;
    }

    form.addEventListener("change", calcularValor);
    calcularValor();

    // Submissão do formulário com validação
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const chkBanho = document.getElementById("servico-banho").checked;
        const chkTosa = document.getElementById("servico-tosa").checked;

        if (!chkBanho && !chkTosa) {
            alert("Selecione pelo menos um serviço (Banho e/ou Tosa) para concluir o agendamento.");
            return;
        }

        const nomeCliente = document.getElementById("cliente-nome").value.trim();
        const emailCliente = document.getElementById("cliente-email").value.trim();
        const nomePet = document.getElementById("pet-nome").value.trim();
        const racaPet = document.getElementById("pet-raca").value.trim();
        const idadePet = document.getElementById("pet-idade").value;
        const metodo = document.querySelector('input[name="metodo-atendimento"]:checked').value;
        const data = document.getElementById("data-agendamento").value;
        const hora = document.getElementById("hora-agendamento").value;

        const servicosSelecionados = [];
        if (chkBanho) servicosSelecionados.push("Banho");
        if (chkTosa) servicosSelecionados.push("Tosa");

        const metodoTexto = metodo === "tele-busca" ? "Tele-busca em domicílio" : "Entrega do pet no local";
        const dataBR = data.split("-").reverse().join("/");
        const valorFinal = calcularValor().toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        elResumo.innerHTML = `
            <div class="alert alert-success mt-4" role="alert" aria-live="polite">
                <h4 class="alert-heading">Agendamento confirmado com sucesso!</h4>
                <p><strong>Cliente:</strong> ${nomeCliente} (${emailCliente})</p>
                <p><strong>Pet:</strong> ${nomePet} — Raça: ${racaPet} (${idadePet} ano(s))</p>
                <p><strong>Serviço(s):</strong> ${servicosSelecionados.join(" + ")}</p>
                <p><strong>Método:</strong> ${metodoTexto}</p>
                <p><strong>Data e Horário:</strong> ${dataBR} às ${hora}</p>
                <hr>
                <p class="mb-0"><strong>Valor estimado:</strong> ${valorFinal}</p>
            </div>
        `;
        elResumo.scrollIntoView({ behavior: "smooth" });
    });
}
