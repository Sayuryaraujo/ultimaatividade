const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    const professor = await prisma.professor.findUnique({
        where: {
            id: Number(data.professorId)
        }
    });

    if (!professor) {
        return res.status(404).json({
            error: "Professor não encontrado."
        });
    }

    const quantidadeTurmas = await prisma.turma.count({
        where: {
            professorId: Number(data.professorId)
        }
    });

    if (quantidadeTurmas >= 3) {
        return res.status(400).json({
            error: "Este professor já possui 3 turmas."
        });
    }

    const item = await prisma.turma.create({
        data: {
            nome: data.nome,
            descricao: data.descricao,
            professorId: Number(data.professorId)
        }
    });

    res.status(201).json(item);
};

const listar = async (req, res) => {
    const lista = await prisma.turma.findMany({
        include: {
            professor: true,
            atividades: true
        }
    });

    res.status(200).json(lista);
};

const buscar = async (req, res) => {
    const { id } = req.params;

    const item = await prisma.turma.findUnique({
        where: { id: Number(id) },
        include: {
            professor: true,
            atividades: true
        }
    });

    res.status(200).json(item);
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;

    const item = await prisma.turma.update({
        where: { id: Number(id) },
        data: dados
    });

    res.status(200).json(item);
};

const excluir = async (req, res) => {
    const { id } = req.params;

    const item = await prisma.turma.delete({
        where: { id: Number(id) }
    });

    res.status(200).json(item);
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};