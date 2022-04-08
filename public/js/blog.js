const createBlogFormHandler = async (event) =>{
    event.preventDefault()
 
    //get values from form 
    const title = document.querySelector('#title-blog').value.trim();
    const description = document.querySelector('#description-blog').value.trim();

    if (title && description) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/blogs', {
          method: 'POST',
          body: JSON.stringify({ title, description }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          // If successful, redirect the browser to the profile page
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
          console.log('please fill out both text fields');
        }
      }
};

document
  .querySelector('.blog-form')
  .addEventListener('submit', createBlogFormHandler);