const boardService = require('./board.service');
const logger = require('../../services/logger.service')

// GET LIST
async function getBoards(req, res) {
    try {
        logger.debug('Getting Boards')
        var queryParams = req.query;
        const boards = await boardService.query(queryParams)
        res.json(boards);
    } catch (err) {
        logger.error('Failed to get boards', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

// GET BY ID 
async function getBoardById(req, res) {
    try {
        const boardId = req.params.id;
        const board = await boardService.getById(boardId)
        res.json(board)
    } catch (err) {
        logger.error('Failed to get board', err)
        res.status(500).send({ err: 'Failed to get board' })
    }
}

// POST (add board)
async function addBoard(req, res) {
    try {
        const board = req.body;
        board.createdAt = Date.now()
        board.labels = [{
            id: "l101",
            title: "Done",
            color: "#519839"
        },
        {
            id: "l102",
            title: "Progress",
            color: "#f2d600"
        },
        {
            id: "l103",
            title: "Open",
            color: " #eb5a46"
        },
        {
            id: "l104",
            title: "Urgent",
            color: "#ff9f1a"
        },
        {
            id: "l105",
            title: "Irrelevant",
            color: "#055a8c"
        },
        {
            id: "l106",
            title: "Assigned",
            color: "#c377e0"
        }
    ]
        const addedBoard = await boardService.add(board)
        res.json(addedBoard)
    } catch (err) {
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}

// PUT (Update board)
async function updateBoard(req, res) {
    try {
        const board = req.body;
        const updatedBoard = await boardService.update(board)
        res.json(updatedBoard)
    } catch (err) {
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })

    }
}

// DELETE (Remove board)
async function removeBoard(req, res) {
    try {
        const boardId = req.params.id;
        const removedId = await boardService.remove(boardId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove board', err)
        res.status(500).send({ err: 'Failed to remove board' })
    }
}

module.exports = {
    getBoards,
    getBoardById,
    addBoard,
    updateBoard,
    removeBoard
}