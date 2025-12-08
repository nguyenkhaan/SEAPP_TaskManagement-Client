import emailjs from '@emailjs/browser';
function sendEmail(clientEmail = '24520059@gm.uit.edu.vn' , teamName = 'CloudTeam' , inviteCode = 'abc123!') {
    // e.preventDefault(); // This is important, i'm not sure why, but the email won't send without it
    
    
    const params = {
        clientEmail , teamName , inviteCode 
    }
    emailjs
        .send(
            import.meta.env.VITE_SERVICE_ID,
            import.meta.env.VITE_TEMPLATE_ID,   //Mot lat sau, dua cac bien nay vao ben trong file .env 
            { ...params },
            {
                publicKey: import.meta.env.VITE_PUBLIC_KEY,
            }
        )
        .then(
            (result) => {
                // console.log('The email has been sent successfully', result)
                // window.location.reload(); // This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
            },
            (error) => {
                console.log(error.text);
            }
        );
}


export default sendEmail