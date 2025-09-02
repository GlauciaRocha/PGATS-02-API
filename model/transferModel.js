// In-memory transfer database
const transfers = [];

function resetTransfers() {
  transfers.length = 0;
}

module.exports = {
  transfers,
  resetTransfers
};