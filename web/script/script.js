const API_PROFESSOR = "http://localhost:3000/professor";
const API_TURMA = "http://localhost:3000/turma";
const API_ATIVIDADE = "http://localhost:3000/atividade";

async function renderizarProfessores() {
const tabela = document.getElementById("professoresTable");

if (!tabela) return;

try {

const resposta = await fetch(
        `${API_PROFESSOR}/listar`
    );
const professores = await resposta.json();

    tabela.innerHTML = "";
    
    professores.forEach(p => {

        tabela.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>${p.email}</td>

                <td>
                    <button onclick="excluirProfessor(${p.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });

} catch (erro) {
    console.error(erro);
}

}
async function cadastrarProfessor() {

const nome = document.getElementById("nome").value;
const email = document.getElementById("email").value;

try {

    await fetch(
        `${API_PROFESSOR}/cadastrar`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                email
            })
        }
    );

    alert("Professor cadastrado!");

    renderizarProfessores();

} catch (erro) {
    console.error(erro);
}

}
async function excluirProfessor(id) {

try {

    await fetch(
        `${API_PROFESSOR}/excluir/${id}`,
        {
            method: "DELETE"
        }
    );

    renderizarProfessores();

} catch (erro) {
    console.error(erro);
}


}
async function renderizarTurmas() {
const tabela = document.getElementById("turmasTable");

if (!tabela) return;

try {

    const resposta = await fetch(
        `${API_TURMA}/listar`
    );

    const turmas = await resposta.json();

    tabela.innerHTML = "";

    turmas.forEach(t => {

        tabela.innerHTML += `
            <tr>
                <td>${t.id}</td>
                <td>${t.nome}</td>
                <td>${t.descricao ?? ""}</td>
                <td>${t.professor?.nome ?? ""}</td>

                <td>
                    <button onclick="excluirTurma(${t.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });

} catch (erro) {
    console.error(erro);
}

}
async function cadastrarTurma() {
const nome = document.getElementById("nomeTurma").value;
const descricao = document.getElementById("descricaoTurma").value;
const professorId = document.getElementById("professorId").value;

try {

    const resposta = await fetch(
        `${API_TURMA}/cadastrar`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                descricao,
                professorId: Number(professorId)
            })
        }
    );

    const dados = await resposta.json();

    if (dados.error) {
        alert(dados.error);
        return;
    }

    alert("Turma cadastrada!");

    renderizarTurmas();

} catch (erro) {
    console.error(erro);
}

}
async function excluirTurma(id) {

try {

    await fetch(
        `${API_TURMA}/excluir/${id}`,
        {
            method: "DELETE"
        }
    );

    renderizarTurmas();

} catch (erro) {
    console.error(erro);
}


}
async function renderizarAtividades() {
const tabela = document.getElementById("atividadesTable");

if (!tabela) return;
try {

    const resposta = await fetch(
        `${API_ATIVIDADE}/listar`
    );
    
    const atividades = await resposta.json();

    tabela.innerHTML = "";

    atividades.forEach(a => {

        tabela.innerHTML += `
            <tr>
                <td>${a.id}</td>
                <td>${a.titulo}</td>
                <td>${a.descricao ?? ""}</td>
                <td>${a.turmaId}</td>

                <td>
                    <button onclick="excluirAtividade(${a.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });

} catch (erro) {
    console.error(erro);
}

}
async function cadastrarAtividade() {
const titulo = document.getElementById("titulo").value;
const descricao = document.getElementById("descricao").value;
const turmaId = document.getElementById("turmaId").value;

try {

    await fetch(
        `${API_ATIVIDADE}/cadastrar`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo,
                descricao,
                turmaId: Number(turmaId)
            })
        }
    );

    alert("Atividade cadastrada!");

    renderizarAtividades();

} catch (erro) {
    console.error(erro);
}

}
async function excluirAtividade(id) {

try {

    await fetch(
        `${API_ATIVIDADE}/excluir/${id}`,
        {
            method: "DELETE"
        }
    );

    renderizarAtividades();

} catch (erro) {
    console.error(erro);
}

}
window.onload = () => {

renderizarProfessores();
renderizarTurmas();
renderizarAtividades();
};
function mostrarLogin(){

    document.getElementById("login").classList.add("active");
    document.getElementById("cadastro").classList.remove("active");

    document.getElementById("btnLogin").classList.add("active");
    document.getElementById("btnCadastro").classList.remove("active");
}
function mostrarCadastro(){

    document.getElementById("cadastro").classList.add("active");
    document.getElementById("login").classList.remove("active");

    document.getElementById("btnCadastro").classList.add("active");
    document.getElementById("btnLogin").classList.remove("active");
}
function fazerLogin() {
    alert("Login feito");

    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    if (!email || !senha) {
        alert("Preencha todos os campos");
        return;
    }

    window.location.href = "paginainicial.html";
}
function fazerCadastro(){

    const nome =
        document.getElementById("cadastroNome").value;

    const email =
        document.getElementById("cadastroEmail").value;

    const senha =
        document.getElementById("cadastroSenha").value;

    if(!nome || !email || !senha){
        alert("Preencha todos os campos");
        return;
    }
alert("Cadastro realizado!");
mostrarLogin();
}
