module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  format_comment: (comment) => {
    return parseInt(comment).toLocaleString();
  },
  format_amount: (amount) => {
    return parseInt(amount).toLocaleString();
  },
};
