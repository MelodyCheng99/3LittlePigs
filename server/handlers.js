module.exports = function (client, gameManager, boardManager, cardManager, statsManager) {
    function handleStartGame(callback) {
        const gameCode = gameManager.startGame(client.id)
        return callback(null, gameCode)
    }

    function handleJoinGame({ gameCode }, callback) {
        if (boardManager.isGameFull(gameCode)) {
            return callback('Cannot join game - game is full')
        }

        const gameCodeResultFromManager = gameManager.joinGame(client.id, gameCode)
        if (gameCodeResultFromManager != null) {
            return callback(null, gameCode)
        } else {
            return callback('Cannot join game - invalid game code')
        }
    }

    function handleGetRandomBoard(callback) {
        const gameCode = gameManager.getGameCodeOfClient(client.id)
        
        const board = boardManager.getRandomBoard(client.id, gameCode)
        return callback(null, board)
    }

    function handleGetRandomCards(callback) {
        const gameCode = gameManager.getGameCodeOfClient(client.id)
        const clientIdsForGame = gameManager.getClientIdsForGame(gameCode)

        const cards = cardManager.getRandomCards(client, gameCode, clientIdsForGame)
        return callback(null, cards)
    }

    function handleInitializeStats() {
        statsManager.initializeStats(client)
    }

    function handleSetSelectedCard({ selectedCard, selectOrDiscard }) {
        const gameCode = gameManager.getGameCodeOfClient(client.id)
        const clientIdsForGame = gameManager.getClientIdsForGame(gameCode)

        cardManager.setSelectedCard(client.id, selectedCard, selectOrDiscard, gameCode, clientIdsForGame)
    }

    function handleUpdateOpponentsStats({ board, updatedStats }) {
        const gameCode = gameManager.getGameCodeOfClient(client.id)
        statsManager.updateOpponentsStats(client, board, updatedStats, gameCode)
    }

    function handleDisconnect() {
        const gameCode = gameManager.getGameCodeOfClient(client.id)
        const board = boardManager.removeClient(client.id, gameCode)

        gameManager.removeClient(client.id, gameCode)
        statsManager.removeClient(client.id, board, gameCode)

        const clientIdsForGame = gameManager.getClientIdsForGame(gameCode)
        cardManager.removeClient(client.id, gameCode, clientIdsForGame)
    }

    return {
        handleStartGame,
        handleJoinGame,
        handleGetRandomBoard,
        handleGetRandomCards,
        handleInitializeStats,
        handleSetSelectedCard,
        handleUpdateOpponentsStats,
        handleDisconnect
    }
}