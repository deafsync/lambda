export function data_formatter (data) {
    const date = new Date(data);
    const formattedDate = date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    return formattedDate
}