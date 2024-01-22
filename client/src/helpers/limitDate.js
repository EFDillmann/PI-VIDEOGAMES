const date = new Date();

const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear() + 4;

const limitDate = `${year}-${month}-${day}`;

export default limitDate;
