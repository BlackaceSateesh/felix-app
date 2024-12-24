// function to format timestamp like "2021-08-01T00:00:00.000Z" to "Wed, 01 Aug 2021"
export const formatDate = (date) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toDateString();
    return formattedDate;
}
