$(document).ready(function() {
  fetchIssueList();
});

function fetchIssueList() {
  fetch("https://api.github.com/repos/nnluukhtn/employment_bot/issues", {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(result => result.json())
    .then(response => {
      localStorage.setItem("issueList", JSON.stringify(response));
      renderIssueList(response);
    })
    .catch(err => console.log(err));
}

function renderIssueList(issueList) {
  const list = $("#issuesList");
  list.empty();
  for (const item in issueList) {
    const issue = issueList[item];
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.addEventListener("click", () => {
      const modal = $("#detailsModal #modal-content");
      modal.empty();
      const modalBody = `
                              <div class="modal-header">
                                  <h5 class="modal-title" id="detailsModal-title">${issue.title}</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                              <div class="modal-body" id="detailsModal-body">
                                <h5>State: </h5><a>${issue.state}</a>
                                <h5>Number: </h5><a>${issue.number}</a>
                                <h5>Description: </h5><p>${issue.body}</p>

                              </div>
                              <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              </div>
                          `;
      modal.append(modalBody);
      $("#detailsModal").modal("show");
    });
    li.appendChild(document.createTextNode(issueList[item].title));
    list.append(li);
  }
}

function filterByState() {
  const state = document.getElementById("filterSelecte").value;

  const issueList = JSON.parse(localStorage.getItem("issueList"));
  const filterdIssues = [];
  if (state === "all") {
    renderIssueList(issueList);
    return;
  }
  for (const item in issueList) {
    const issue = issueList[item];
    if (issue.state === state) {
      filterdIssues.push(issue);
    }
  }
  renderIssueList(filterdIssues);
}
