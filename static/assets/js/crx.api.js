class API {
  constructor() {
    this.ep =
      "https://crx-api.azurewebsites.net/api/matt/github/activity/group";
    this.setup();
  }

  setup() {
    let root = document.getElementById("api__GH_commit_activity");
    if (root != null) this.GH__getCommitActivity(root);
  }

  since(date) {
    // from: https://stackoverflow.com/a/3177838 👌

    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }

    return Math.floor(seconds) + " seconds";
  }

  GH__getCommitActivity(root) {
    window.$.getJSON(this.ep, data => {
      root.innerHTML = `
        <div class="activity">
          ${data
            .map(
              entry => `
                <div class="repo">
                  <div class="details">
                    <div class="name">
                      <a href="${entry.repo.htmlUrl}" target="_BLANK">
                        <h5>${entry.repo.fullName}</h5>
                      </a>
                    </div>
                    <div class="lang"><p>Written in ${
                      entry.repo.language
                    }</p></div>
                    <p>${
                      entry.repo.description
                        ? entry.repo.description
                        : `<i>No description</i>`
                    }</p>
                  </div>
                  <table class="commits">
                    ${entry.commits
                      .map(
                        commit => `
                          <tr class="commit">
                            <td class="message">
                              <a href="${commit.htmlUrl}" target="_BLANK">
                                ${commit.commit.message}
                              </a>
                            </td>
                            <td class="date">
                              <time datetime="${
                                commit.commit.committer.date
                              }" title="${commit.commit.committer.date}">
                                ${this.since(
                                  new Date(commit.commit.committer.date)
                                )} ago
                              </time>
                            </td>
                          </tr>
                        `
                      )
                      .join("")}
                  </table>
                </div>
              `
            )
            .join("")}
        </div>
      `;
    });
  }
}

new API();
