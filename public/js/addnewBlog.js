async function newBlogHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value;
    const content = document.querySelector('#content').value;

    // TODO: What part of our application will handle this 'put' request?
    const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // TODO: What happens if the response is ok?
    if (response.ok) {
        document.location.replace("dashboard");
    } else {
        alert('Failed to add new blog post!');
    }
}

function hide() {
    modal = document.querySelector("#new")
    modal.classList.toggle("hidden");
}
document.getElementById("myBtn").addEventListener("click", hide);
document.querySelector('.new-form').addEventListener("submit", newBlogHandler);