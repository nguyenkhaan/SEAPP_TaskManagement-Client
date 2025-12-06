const rules = {
    Email: {
        //To thieu, toi dai, chuan form 
        pattern: {
            value: /^[a-zA-Z0-9._+]+@(gmail\.com|gm\.uit\.edu\.vn)$/g, 
            message: '*Định dạng Email không chính xác*'
        }, 
        minLength: {
            value: 15, 
            message: "*Không đủ độ dài tối thiếu*"
        }
        
    }, 
    Password: {
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/g, 
            message: "Mật khẩu phải có ít nhất một chữ cái và một chữ số"
        }, 
        minLength: {
            value: 8, 
            message: "*Mật khẩu phải có tối thiếu 8 kí tự*"
        }, 
    }, 
}
const getFormRule = (formType) => {
    if (rules[formType]) return rules[formType]
    return { }
}
export default getFormRule                                      