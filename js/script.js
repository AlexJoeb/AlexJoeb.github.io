// ========================
// = Variables 
// ========================

const aboutme = "Hi, I'm Xander. With a past in public safety, I aspire to serve my community (whether that be on or off line) with elegant, professional, and flexiable websites. I started programming in languages such as Java when I was young and my interest took off from there. Now, my craft is Front-End Website Engingeering. Through the use of EcmaScript 6 (JavaScript), I am able to bring the power of code back to the client and allow them to decide exactly how they want their website to run.";

const langUL = $(`.skills__dev--d__languages`);
const pfwUL = $(`.skills__dev--pf__pfw`);
const otherUL = $(`.skills__dev--o__other`);
const ssUL = $(`.skills__dev--ss__softskills`);

const projDiv = $(`.projects`);

// ========================
// = Arrays 
// ========================
const skills = {
    languages: {
        path: langUL,
        list: ["HTML5", "CSS3", "JavaScript"]
    },
    preprocessors: {
        path: pfwUL,
        list: ["SASS"],
    },
    other: {
        path: otherUL,
        list: ["VSCode", "Adobe Illustrator", "Microsoft Office"]
    },
    softskills: {
        path: ssUL,
        list: ["Clarity",
        "Confidence",
        "Respect",
        "Empathy",
        "Listening",
        "Dedication",
        "Verbal Communication",
        "Non-verbal Communication",
        "Written Communication",
        "Constructive Feedback",
        "Friendliness",
    ],
},
};

let projects = [];

// ========================
// = EventListeners 
// ========================

$(".hamburger").click((evt) => {
    const target = evt.target;
    const ham = getHamburger(target);
    ham.toggleClass("close");
    $(".nav--wrapper").slideToggle();
});

$(".contact form").click((e) => {
    e.preventDefault();
    const t = e.target;
    if (t.name == 'submit') {
        if ($(`.contact input[name='name']`).val() == '' || $(`.contact input[name='email']`).val() == '' || $(`.contact textarea[name='message']`).val() == '') {
            alert(`You forgot to enter something!`);
        }else{
            clearFields();
            alert(`Message sent.`, `success`);
        }
    }
    if (t.name == 'clear') {
        clearFields();
        alert(`All field are clear.`, `info`);
    }
});

$(`.nav--mobile a.navbutton`).click(() => {
    $(`.hamburger`).removeClass(`close`);
    $(`.nav--wrapper`).slideToggle();
});

// ========================
// = Functions 
// ========================

const clearFields = () => {
    $(`.contact input[name='name']`).val('');
    $(`.contact input[name='email']`).val('');
    $(`.contact textarea[name='message']`).val('');
}

const alert = (msg, type = 'warn') => {
    let div = $('.contact__alert');
    let p = $('.contact__alert p');
    let m = msg || `<strong>Opps!</strong> No message defined.`;
    if (type == 'warn') {
        console.log("D");
        m = `<strong>Opps!</strong> ` + m;
        div.css(`background`, `#C21807`);
    } else if (type == 'info') {
        m = `<strong>Hey!</strong> ` + m;
        div.css(`background`, `#3C91E6`);
    } else if (type == 'success') {
        m = `<strong>Yay!</strong> ` + m;
        div.css(`background`, `#9FD356`);
    }
    
    p.html(m);
    div.slideToggle(500, () => {
        setTimeout(() => {
            div.slideToggle(500);
        }, 3000);
    });
}

const getHamburger = t => {
    if ($(t).hasClass("hamburger__slice")) {
        return $(t).parent();
    } else return $(t);
}

const returnUl = list => {
    let string = "";
    for (let i = 0; i < list.length; i++) {
        string += `<li>${list[i]}</li>`;
    }
    return string;
}

const filter = str => {
    let first = true;
    let strList = str.split('');
    const filterOut = ["-", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Project"];

    const strResult = strList.filter(c => !(filterOut.includes(c)));

    let newStr = [];

    strResult.forEach(c => {
        if (isUpper(c) && !first) {
            newStr.push(` ${c}`);
        } else {
            if (first) first = false;
            newStr.push(`${c}`);
        }
    });

    return newStr
        .join("")
        .split(" ")
        .filter(word => word !== "Project").join(" ");
}

const isUpper = c => {
    return c === c.toUpperCase();
}

const getProjectByID = id => {
    for (let i = 0; i < projects.length; i++) {
        const id2 = projects[i].id;
        if (id === id2) {
            return projects[i];
        } else continue;
    }
    return null;
}

const fillProjects = () => {
    getProjectByID(175998035).show = false;
    projects.forEach(p => {
        let markup = `
            <div class="projects__card">
                <div class="projects__card__top ${p.id}"></div>
                <div class="projects__card__bottom">
                    <p class="projects__card__bottom__title">${p.title}</p>
                    <p class="projects__card__bottom__desc">${p.desc}</p>
                    <ul class="projects__card__bottom__langs ${p.id}">
                    </ul>
                    <a href="${p.githubLink}" class="projects__card__bottom__github">See <br>Code</a>
                </div>
            </div>
        `;

        if (!p.show) {
            markup = ``;
        }

        const temp = $(`${markup}`);


        projDiv.append(temp);
        $(`.projects__card__top.${p.id}`).css('background', `url(${p.picture}) no-repeat center top`);
        $(`.projects__card__top.${p.id}`).css('background-size', `cover`);

    });
    let timers = [];
    projects.forEach(p => {
        let timer = setInterval(() => {
            if (p.languages != null) {
                p._languages.forEach(l => {
                    const t = `<li>${l}</li>`;
                    $(`.${p.id}.projects__card__bottom__langs`).append(t);
                });
            }
        }, 500);
        timers.push(timer);
    });

    setTimeout(() => {
        timers.forEach(t => {
            clearInterval(t);
        });
    }, 550);

    $('.contact__alert').hide();
}

// ========================
// = Github API 
// ========================
$(document).ready(() => {
    const username = "alexjoeb";

    // Make AJAX Request to GitHub
    $.ajax({
        url: `https://api.github.com/users/${username}/repos`,
        data: {
            client_id: `52c609e4d2bb916c9623`,
            client_secret: `f0b183101fa3041ff0f8276b7129e3e2674175a1`,
        }
    }).done((resp) => {
        resp.forEach(r => {
            let vars = {
                id: r.id,
                name: filter(r.name),
                rname: r.name,
                desc: r.description !== null ? r.description : "No description.",
                upload_date: r.created_at.split("T")[0],
                gh_link: r.html_url,
                photo: `../Images/Projects/${r.id}.png`,
            }
            projects.push(new Project(vars.id, vars.name, vars.rname, vars.desc, null, vars.photo, vars.gh_link, vars.upload, true));
        });

        projects.forEach(p => {
            const path = p;
            $.ajax({
                url: `https://api.github.com/repos/${username}/${path.rName}/languages`,
                // data: {
                //     client_id: `52c609e4d2bb916c9623`,
                //     client_secret: `f0b183101fa3041ff0f8276b7129e3e2674175a1`,
                // }
            }).done((resp) => {
                let ls = [];
                for (let key in resp) {
                    ls.push(key);
                }
                path._languages = ls;
            });
        });
        fillProjects();
    });

    for (let skill in skills) {
        const s = skills[`${skill}`];
        const path = s.path || null;
        if (!path) {
            return;
        } else {
            s.list.forEach(l => s.path.append(`<li>${l}</li>`));
        }
    }


});

// ========================
// = Classes 
// ========================

class Project {
    // name, description, Created_At (Upload Date), HTML_URL (Code Link), Show T/F
    constructor(_id, _title, _realName, _desc, _langs, _picture, _ghLink, _upload, _show) {
        this.id = _id;
        this.title = _title;
        this.rName = _realName;
        this.desc = _desc;
        this.languages = null;
        this.picture = _picture;
        this.githubLink = _ghLink;
        this.uploadDate = _upload;
        this.show = _show;
    }

    get id() {
        return this._id;
    }
    set id(i) {
        this._id = i;
    }

    get languages() {
        return this._languages;
    }
    set languages(l) {
        this._languages = l;
    }

    get realName() {
        return this._realName;
    }
    set realName(r) {
        this._realName = r;
    }

    get title() {
        return this._title;
    }
    set title(t) {
        this._title = t;
    }

    get desc() {
        return this._desc;
    }
    set desc(d) {
        this._desc = d;
    }

    get picture() {
        return this._picture;
    }
    set picture(p) {
        this._picture = p;
    }

    get githubLink() {
        return this._githubLink;
    }
    set githubLink(gh) {
        this._githubLink = gh;
    }

    get uploadDate() {
        return this._uploadDate;
    }
    set uploadDate(ud) {
        this._uploadDate = ud;
    }
}