class API {
  constructor() {
    this.base = "https://api.crookm.com/v2";
    this.setup();
  }

  setup() {
    let gh_commit_activity_root = document.getElementById(
      "api__GH_commit_activity"
    );
    if (gh_commit_activity_root != null)
      this.GH__getCommitActivity(gh_commit_activity_root);

    let tw_reply_thread_root = document.getElementById("api__TW_reply_thread");
    if (tw_reply_thread_root != null)
      this.TW__getPostThread(tw_reply_thread_root);
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
    window.$.getJSON(`${this.base}/gh/get/activity`, data => {
      root.innerHTML = `
        <div class="activity">
          ${data.data
            .map(
              entry => `
                <div class="repo">
                  <div class="details">
                    <div class="name">
                      ${!entry.repo.private && `<a href="${entry.repo.html_url}" target="_BLANK">`}
                        <h5>${entry.repo.full_name}</h5>
                      ${!entry.repo.private && `</a>`}
                    </div>
                    <div class="lang"><p>
                    Written in ${entry.repo.language}
                    <br />
                    Updated <time datetime="${entry.repo.updated_at}" title="${entry.repo.updated_at}">
                      ${this.since(
                        new Date(entry.repo.updated_at)
                      )} ago
                    </time>
                    </p></div>
                    <p>${
                      entry.repo.description
                        ? entry.repo.description
                        : `<i>No description</i>`
                    }</p>
                  </div>
                  ${entry.commits.length > 0 && `<table class="commits">
                    ${entry.commits
                      .map(
                        commit => `
                          <tr class="commit">
                            <td class="message">
                              <a href="${commit.html_url}" target="_BLANK">
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
                  </table>`}
                </div>
              `
            )
            .join("")}
        </div>
      `;
    });
  }

  TW__getPostThread(root) {
    window.$.getJSON(
      `${this.base}/tw/get/thread?path=${window.location.pathname}`,
      data => {
        if (data["list"] && data["id"]) {
          let list = data["list"].replace("custom-", "");
          let tl_url = `https://twitter.com/mattlc_3/timelines/${list}`;
          root.innerHTML = `
            <div id="reply-widget">
              <div class="twbutton-container">
                <a class="twbutton" title="Reply to this post" href="https://twitter.com/intent/tweet?in_reply_to=${data["id"]}&ref_src=twsrc%5Etfw">
                  <i></i>
                  <span class="twbutton-label">Tweet your Response</span>
                </a>
              </div>
            </div>
            
            <a class="twitter-timeline" data-dnt="true" href="${tl_url}">Replies - Curated tweets by mattlc_3</a>`;

          twttr.widgets.load(root); // setup the widget
        }

        // else no comments thread found, just ignore
      }
    );
  }
}

new API();
