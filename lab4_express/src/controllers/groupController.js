const groupService = require('../services/groupService');

const getAllGroups = (req, res) => {
    const { groupName, format } = req.query;
    const groups = groupService.findAll(groupName, format);
    res.json(groups);
};

const getGroupById = (req, res) => {
    const id = parseInt(req.params.id);
    const group = groupService.findOne(id);

    if (!group) {
        return res.status(404).json({ error: 'Группа не найдена' });
    }

    res.json(group);
};

const createGroup = (req, res) => {
    const { src, groupName, specialty, description, services, price, format, rating, students, teacher, contact, experience, startDate } = req.body;

    if (!groupName || !specialty || !price) {
        return res.status(400).json({ error: 'Не все обязательные поля заполнены' });
    }

    const newGroup = groupService.create({
        src: src || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        groupName,
        specialty,
        description: description || "Оказываем помощь с лабораторными и домашними заданиями",
        services: services || ["Помощь с лабами", "Консультации"],
        price,
        format: format || "Онлайн",
        rating: rating || 5.0,
        students: students || 0,
        teacher: teacher || "Новый куратор",
        contact: contact || "@new_group",
        experience: experience || "1 год",
        startDate: startDate || new Date().toISOString().split('T')[0]
    });

    res.status(201).json(newGroup);
};

const updateGroup = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedGroup = groupService.update(id, req.body);

    if (!updatedGroup) {
        return res.status(404).json({ error: 'Группа не найдена' });
    }

    res.json(updatedGroup);
};

const deleteGroup = (req, res) => {
    const id = parseInt(req.params.id);
    const success = groupService.remove(id);

    if (!success) {
        return res.status(404).json({ error: 'Группа не найдена' });
    }

    res.status(204).send();
};

module.exports = {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup
};
