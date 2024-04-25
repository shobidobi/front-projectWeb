class UserViewObject {
    constructor(username, userId, accessKey, companyNumber,is_change_company_code) {
        this.username = username;
        this.userId = userId;
        this.is_change_company_code= is_change_company_code;
        this.accessKey = accessKey;
        this.companyNumber = companyNumber;
    }

    getUsername() {
        return this.username;
    }

    getUserId() {
        return this.userId;
    }

    getAccessKey() {
        return this.accessKey;
    }

    getCompanyNumber() {
        return this.companyNumber;
    }

    setUsername(username) {
        this.username = username;
    }

    setUserId(userId) {
        this.userId = userId;
    }

    setAccessKey(accessKey) {
        this.accessKey = accessKey;
    }

    setCompanyNumber(companyNumber) {
        this.companyNumber = companyNumber;
    }
    setIsChangeCompanyCode(is_change_company_code){
        this.is_change_company_code=is_change_company_code;
    }
    getIsChangeCompanyCode(){
        return this.is_change_company_code;
    }
}
export default UserViewObject;

// דוגמה לשימוש באובייקט:
// const userViewObject = new UserViewObject('JohnDoe', 123456, 'abc123', '789');
//
// // השגת פרטים על ידי פונקציות המאחזרות
// console.log(userViewObject.getUsername());  // 'JohnDoe'
// console.log(userViewObject.getUserId());  // 123456
// console.log(userViewObject.getAccessKey());  // 'abc123'
// console.log(userViewObject.getCompanyNumber());  // '789'
//
// // עדכון פרטים על ידי פונקציות הקובעות
// userViewObject.setUsername('JaneDoe');
// userViewObject.setUserId(654321);
// userViewObject.setAccessKey('xyz789');
// userViewObject.setCompanyNumber('987');
//
// // הדפסת הפרטים לאחר העדכון
// console.log(userViewObject);