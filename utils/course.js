export const retrive_course_infos = (data, category, admin=false) => {
    /**
     * Get structed data from category course
     */

    /*
    imageSrc
    title

    */

    /*
        "description": "L'informatique est un domaine d'activité scientifique, technique, et industriel concernant le traitement automatique de l'information numérique par l'exécution de programmes informatiques hébergés par des dispositifs électriques-électroniques : des systèmes embarqués, des ordinateurs, des robots, des automates, etc.",
        "titre": "L'informatique pour les débutants",
        "will_learn": "- Les bases de l'informatique\\n-la prise en main de l'informatique\\n-Les différentes bases pour se mettre à voir",
        "prerequis": "- Avoir ton ordinateur\\n-Une connexion internet",
        "level": "Débutant",
        "langue": "français",
        "langue_dub": "anglais",
        "langue_subtitles": "fongbe",
        "montant": "0.00",
        "created_at": "2024-04-10T11:25:48.832666Z",
        "updated_at": "2024-04-10T11:25:48.832776Z",
        "categorie": 1
    */

    let infos = []

    for (let i = 0; i < data.length; i++) {
        if(!admin && data[i].cours.length > 0)
            infos.push({
                level: data[i].level,
                rating: getRandomValue(),
                paid: !(data[i].montant == "0.00"),
                authorName: data[i].author.first_name + " " + data[i].author.last_name,
                authorImageSrc: data[i].author.image,
                imageSrc: data[i].image,
                category: category,
                lessonCount: data[i].cours.length,
                title: data[i].titre,
                language: data[i].langue,
                dub_language: data[i].langue_dub,
                id: data[i].id
            })
        if(admin)
            infos.push({
                level: data[i].level,
                rating: getRandomValue(),
                paid: !(data[i].montant == "0.00"),
                authorName: data[i].author.first_name + " " + data[i].author.last_name,
                authorImageSrc: data[i].author.image,
                imageSrc: data[i].image,
                category: "",
                lessonCount: data[i].cours.length,
                title: data[i].titre,
                language: data[i].langue,
                dub_language: data[i].langue_dub,
                id: data[i].id
            })
    }

    // console.log("INFOS  --> ", infos)
    
    return infos

}

export function getRandomValue() {
    const min = 3;
    const max = 4;
    const step = 0.1;

    // Calculate the number of steps
    const steps = (max - min) / step;

    // Generate a random step and multiply by the step size
    const randomStep = Math.floor(Math.random() * (steps + 1));

    // Calculate the random value
    const randomValue = min + (randomStep * step);

    return randomValue;
}