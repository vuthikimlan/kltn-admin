function formatDate(updateDay) {
    const date = new Date(updateDay);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
  }

export default formatDate;