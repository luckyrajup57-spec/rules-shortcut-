/* ===============================
   NYAYAAI FRONTEND
================================ */

const articles = [

    {
        number: "Article 12",
        title: "Definition of State",
        category: "government",
        description:
            "Defines the expression 'State' for the purpose of Fundamental Rights."
    },

    {
        number: "Article 14",
        title: "Equality before law",
        category: "rights",
        description:
            "Provides the constitutional principle of equality before the law and equal protection of laws."
    },

    {
        number: "Article 19",
        title: "Freedom of speech and other freedoms",
        category: "rights",
        description:
            "Provides specified freedoms subject to constitutionally permitted restrictions."
    },

    {
        number: "Article 21",
        title: "Protection of life and personal liberty",
        category: "rights",
        description:
            "Provides constitutional protection of life and personal liberty."
    },

    {
        number: "Article 21A",
        title: "Right to education",
        category: "rights",
        description:
            "Provides for free and compulsory education for children within the constitutional framework."
    },

    {
        number: "Article 32",
        title: "Constitutional remedies",
        category: "rights",
        description:
            "Provides a constitutional remedy for enforcement of Fundamental Rights."
    },

    {
        number: "Article 51A",
        title: "Fundamental Duties",
        category: "duties",
        description:
            "Sets out Fundamental Duties of citizens."
    },

    {
        number: "Article 39A",
        title: "Equal justice and free legal aid",
        category: "directive",
        description:
            "Directs the State to promote equal justice and provide free legal aid."
    }

];


/* ===============================
   ARTICLE DATABASE
================================ */

function displayArticles(data = articles) {

    const grid =
        document.getElementById("articleGrid");

    grid.innerHTML = "";

    document.getElementById("articleCount").textContent =
        data.length;

    if (data.length === 0) {

        grid.innerHTML = `
            <div class="article-card">
                No matching Article found.
            </div>
        `;

        return;
    }

    data.forEach(article => {

        const card =
            document.createElement("div");

        card.className = "article-card";

        card.innerHTML = `

            <div class="number">
                ${article.number}
            </div>

            <h3>
                ${article.title}
            </h3>

            <p>
                ${article.description}
            </p>

            <div class="card-buttons">

                <button onclick='bookmarkArticle(${JSON.stringify(article)})'>
                    🔖 Save
                </button>

                <button onclick='viewArticle(${JSON.stringify(article)})'>
                    View
                </button>

            </div>

        `;

        grid.appendChild(card);

    });

}


displayArticles();


/* ===============================
   ARTICLE SEARCH
================================ */

function filterArticles() {

    const search =
        document
            .getElementById("articleSearch")
            .value
            .toLowerCase();

    const category =
        document
            .getElementById("articleCategory")
            .value;

    const filtered =
        articles.filter(article => {

            const matchesSearch =

                article.number
                    .toLowerCase()
                    .includes(search)

                ||

                article.title
                    .toLowerCase()
                    .includes(search)

                ||

                article.description
                    .toLowerCase()
                    .includes(search);

            const matchesCategory =

                category === "all"
                ||
                article.category === category;

            return matchesSearch && matchesCategory;

        });

    displayArticles(filtered);

}


/* ===============================
   GLOBAL SEARCH
================================ */

function searchDatabase() {

    const query =
        document
            .getElementById("globalSearch")
            .value
            .toLowerCase()
            .trim();

    if (!query) {

        alert("Enter something to search.");

        return;

    }

    const results =
        articles.filter(article =>

            JSON.stringify(article)
                .toLowerCase()
                .includes(query)

        );

    document
        .getElementById("constitution")
        .scrollIntoView();

    displayArticles(results);

}


function quickSearch(text) {

    document
        .getElementById("globalSearch")
        .value = text;

    searchDatabase();

}


/* ===============================
   LAW FILTER
================================ */

function filterLaw(law) {

    document
        .getElementById("globalSearch")
        .value = law;

    document
        .getElementById("constitution")
        .scrollIntoView();

}


/* ===============================
   BOOKMARKS
================================ */

function bookmarkArticle(article) {

    let bookmarks =
        JSON.parse(
            localStorage.getItem("nyayaaibookmarks")
        ) || [];

    const exists =
        bookmarks.some(
            item => item.number === article.number
        );

    if (!exists) {

        bookmarks.push(article);

        localStorage.setItem(
            "nyayaaibookmarks",
            JSON.stringify(bookmarks)
        );

        alert(
            `${article.number} saved to bookmarks.`
        );

    } else {

        alert("Already bookmarked.");

    }

}


/* ===============================
   ARTICLE VIEW
================================ */

function viewArticle(article) {

    const result =
        document.getElementById("aiResult");

    result.innerHTML = `

        <h3>
            ${article.number}: ${article.title}
        </h3>

        <p>
            ${article.description}
        </p>

        <br>

        <strong>
            Official verification:
        </strong>

        <p>
            Verify the current constitutional text through
            the Legislative Department's official website.
        </p>

        <br>

        <a
            href="https://www.legislative.gov.in/"
            target="_blank"
        >
            Open Official Source →
        </a>

    `;

    document
        .querySelector(".ai-section")
        .scrollIntoView();

}


/* ===============================
   DARK MODE
================================ */

const themeBtn =
    document.getElementById("themeBtn");

themeBtn.addEventListener(
    "click",
    () => {

        document
            .body
            .classList
            .toggle("dark");

        const dark =
            document
                .body
                .classList
                .contains("dark");

        localStorage.setItem(
            "nyayaTheme",
            dark ? "dark" : "light"
        );

        themeBtn.textContent =
            dark ? "☀️" : "🌙";

    }
);


if (
    localStorage.getItem("nyayaTheme")
    === "dark"
) {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


/* ===============================
   LOGIN
================================ */

const loginModal =
    document.getElementById("loginModal");

document
    .getElementById("loginBtn")
    .addEventListener(
        "click",
        () => {

            loginModal
                .classList
                .add("active");

        }
    );


function closeLogin() {

    loginModal
        .classList
        .remove("active");

}


async function login() {

    const email =
        document
            .getElementById("email")
            .value;

    const password =
        document
            .getElementById("password")
            .value;

    if (!email || !password) {

        showAuthMessage(
            "Enter email and password."
        );

        return;

    }

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/auth/login",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })

                }
            );

        const data =
            await response.json();

        if (response.ok) {

            localStorage.setItem(
                "nyayaToken",
                data.token
            );

            showAuthMessage(
                "Login successful."
            );

            setTimeout(
                closeLogin,
                1000
            );

        } else {

            showAuthMessage(
                data.message ||
                "Login failed."
            );

        }

    } catch (error) {

        showAuthMessage(
            "Backend is not running."
        );

    }

}


async function signup() {

    const email =
        document
            .getElementById("email")
            .value;

    const password =
        document
            .getElementById("password")
            .value;

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/auth/signup",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })

                }
            );

        const data =
            await response.json();

        showAuthMessage(
            data.message ||
            "Account created."
        );

    } catch (error) {

        showAuthMessage(
            "Backend is not running."
        );

    }

}


function showAuthMessage(message) {

    document
        .getElementById("authMessage")
        .textContent = message;

}


/* ===============================
   AI
================================ */

async function askAI() {

    const question =
        document
            .getElementById("aiQuestion")
            .value
            .trim();

    const result =
        document
            .getElementById("aiResult");

    if (!question) {

        result.innerHTML =
            "Please enter a question.";

        return;

    }

    result.innerHTML =
        "🤖 Searching legal knowledge...";

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/ai/ask",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        question
                    })

                }
            );

        const data =
            await response.json();

        if (response.ok) {

            result.innerHTML = `

                <h3>AI Explanation</h3>

                <p>
                    ${escapeHTML(data.answer)}
                </p>

                <br>

                <strong>
                    Sources
                </strong>

                <p>
                    AI answers should be verified against
                    the cited primary sources.
                </p>

            `;

        } else {

            result.innerHTML =
                data.message ||
                "AI request failed.";

        }

    } catch (error) {

        result.innerHTML = `

            <strong>
                Backend not connected.
            </strong>

            <p>
                Start the Node.js backend and configure
                your AI API key.
            </p>

        `;

    }

}


/* ===============================
   SECURITY HELPER
================================ */

function escapeHTML(text) {

    return text

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


/* ===============================
   LANGUAGE
================================ */

document
    .getElementById("language")
    .addEventListener(
        "change",
        function () {

            if (this.value === "hi") {

                document
                    .querySelector(".hero h1")
                    .innerHTML =
                    "संविधान समझें।<br><span>अपने अधिकार जानें।</span>";

                document
                    .querySelector(".hero p")
                    .textContent =
                    "भारतीय संविधान, अनुच्छेद, अधिनियम और कानूनी जानकारी को सरल भाषा में समझें।";

            } else {

                document
                    .querySelector(".hero h1")
                    .innerHTML =
                    'Understand the <span>Constitution.</span><br>Know your rights.';

                document
                    .querySelector(".hero p")
                    .textContent =
                    "Explore the Constitution of India, Articles, Acts, rules, regulations and legal procedures through a simple knowledge platform.";

            }

        }
    );