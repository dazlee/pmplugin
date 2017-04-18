const UserModel = require("../models/user");
const passport = require("passport"),
      LocalStrategy = require("passport-local").Strategy;
const logger = require("../lib/logger");
const uuidV4 = require("uuid/v4");
const UserFields = "username role displayName";
const PrivilegedUserFields = "username password role displayName photos providers pageId";
const { ObjectId } = require('mongoose').Types;
// login passport setup
passport.use(new LocalStrategy(
    function(username, password, done) {
        UserModel.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            const returnUser = {
                _id: user._id,
                username: user.username,
                role: user.role,
                photos: user.photos,
            };
            return done(null, returnUser);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser(function(_id, done) {
    UserModel.findOne({_id: _id}, function(err, user) {
        const returnUser = {
            _id: user._id,
            username: user.username,
            role: user.role,
            photos: user.photos
        };
        done(null, user);
    });
});

function createUser (attributes) {
	return new Promise((resolve, reject) => {
        UserModel.create({
			username: attributes.username,
			password: attributes.password,
			displayName: attributes.displayName,
            photos: attributes.photos,
			pageId: attributes.pageId,
			lineAtId: attributes.lineAtId,
			role: attributes.role,
			providers: attributes.providers
		}, (error, user) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(user);
        });
    });
}
function createUserWithRandomUsername (attributes) {
	const username = uuidV4();
	return new Promise((resolve, reject) => {
        UserModel.create({
			username: username,
			password: username,
			displayName: attributes.displayName,
            photos: attributes.photos,
			role: attributes.role,
			providers: attributes.providers
		}, (error, user) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(user);
        });
    });
}
function signup (attributes) {
    return new Promise((resolve, reject) => {
        UserModel.create({
            username: attributes.username,
            password: attributes.password,
        }, (error, user) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(user);
        });
    });
}
function checkUserExist (attributes) {
    return new Promise((resolve, reject) => {
        UserModel.where(attributes).count((error, count) => {
            if (error) {
                reject(error);
                return;
            }
            if (count === 0) {
                reject(new Error("no such user"));
            }
            resolve();
        });
    });
}
function getUser (attributes) {
    return new Promise((resolve, reject) => {
        UserModel.findOne(attributes, UserFields, (error, user) => {
            if (error) {
                reject(error);
                return;
            }
            if (!user) {
                reject({
                    reason: "user_not_found",
                    message: "No such user",
                });
                return;
            }
            resolve(user);
        });
    });
}
function getUsers (attributes) {
    return new Promise((resolve, reject) => {
        UserModel.find(attributes, UserFields, (error, users) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(users);
        });
    });
}
function getUsersWithPriviledge (attributes) {
    return new Promise((resolve, reject) => {
        UserModel.find(attributes, PrivilegedUserFields)
		.exec((error, users) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(users);
        });
    });
}
function updateUserPageId (attributes) {
    return new Promise((resolve, reject) => {
        UserModel.update({
			username: attributes.username
		}, {
			$set: {
				pageId: attributes.pageId
			}
		})
		.exec((error, doc) => {
			if (error) {
				reject(error);
				return;
			}
			resolve(doc);
		});
    });
}
function addClientUserIdToAgent (attributes) {
	return new Promise((resolve, reject) => {
		const query = {
			_id: new ObjectId(attributes.agentId)
		};
		const document = {
			$addToSet: {
				clientUserIds: attributes.clientUserId
			}
		};
		UserModel.update(query, document)
		.exec((error, doc) => {
			if (error) {
				reject(error);
				return;
			}
			resolve(doc);
		});
	});
}

module.exports = {
    signup,
    checkUserExist,
    getUser,
	getUsers,
	updateUserPageId,
	createUser,
	getUsersWithPriviledge,
	createUserWithRandomUsername,
	addClientUserIdToAgent,
};
