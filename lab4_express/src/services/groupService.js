const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (groupName, format) => {
    let groups = fileService.readData(dataFilePath);

    if (groupName) {
        groups = groups.filter(group =>
            group.groupName.toLowerCase().includes(groupName.toLowerCase())
        );
    }

    if (format && format !== '') {
        groups = groups.filter(group => group.format === format);
    }

    return groups;
};

const findOne = (id) => {
    const groups = fileService.readData(dataFilePath);
    return groups.find(group => group.id === id);
};

const create = (groupData) => {
    const groups = fileService.readData(dataFilePath);

    const newId = groups.length > 0
        ? Math.max(...groups.map(g => g.id)) + 1
        : 1;

    const newGroup = { id: newId, ...groupData };
    groups.push(newGroup);
    fileService.writeData(dataFilePath, groups);

    return newGroup;
};

const update = (id, groupData) => {
    const groups = fileService.readData(dataFilePath);
    const index = groups.findIndex(g => g.id === id);

    if (index === -1) return null;

    groups[index] = { ...groups[index], ...groupData };
    fileService.writeData(dataFilePath, groups);

    return groups[index];
};

const remove = (id) => {
    const groups = fileService.readData(dataFilePath);
    const filteredGroups = groups.filter(g => g.id !== id);

    if (filteredGroups.length === groups.length) {
        return false;
    }

    fileService.writeData(dataFilePath, filteredGroups);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
