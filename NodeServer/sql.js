module.exports = {
    userinfo: {
        query: `SELECT USER_ID, USER_NICKNAME, USER_TEL, USER_ADDRESS1, USER_ADDRESS2, USER_AGE, SEX, GENRE from user where USER_ID=?`,
    },
};