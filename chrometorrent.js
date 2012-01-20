function ChromeTorrent() {

// Fields
	var self = this;
	var host = "";
	var username = "";
	var password = "";
	var token = "";

// Private methods
	var resetToken = function( callback ) {
		$.ajax( {
			url:      host + "token.html",
			success:  function(data) { token = $(data).first().first().html(); if( callback !== undefined ) callback(); },
			username: username,
			password: password,
			error: function( xhr,status,e){
				throw { message: "when fetching api token. encountered " +status+e};
			}
		});
	};
	
	var hasStorageChanged = function() {
		return localStorage["host"] !== host || localStorage["user"] !== username || localStorage["pass"] !== password;
	};

	var refetchStorage = function() {
		host = localStorage["host"];
		username = localStorage["user"];
		password = localStorage["pass"];
	};
	
	var postTorrent = function(torrent) {
		$.ajax( {
			url:      self.createDownloadUrlForTorrent(torrent),
			username: self.getUser(),
			password: self.getPassword(),
			error: function(xhr,status,e){ throw {message:"when posting torrent. encountered "+status+e};}

		});

	};

// Public methods
	this.getUser = function() {
					return username;
	};
	this.getHost= function() {
					return host;
	};
	this.getPassword= function() {
					return password;
	};
	this.getToken = function() {
					return token;
	};
	
	this.createDownloadUrlForTorrent =  function (url) {
		return self.getHost() + "?token=" + self.getToken() + "&action=add-url&s=" + escape(url);
	};

	this.addTorrent = function(torrentUrl) {
		if( !hasStorageChanged() ) {
			// quick way
			postTorrent(torrentUrl);
		} else {
			//slow way, redo token thing
			refetchStorage();
			resetToken( function(){ postTorrent(torrentUrl) } );
		}
	};
}

function makeLog() {
	var maxEntries = 100;
	var loglabel = "logdata";
	var saveLog = function( log ){
		localStorage[loglabel] = JSON.stringify(log);
	};

	var getTime= function(){
		var t = new Date();
		return t.toISOString()
	};

	var ensureNotExceedingMax = function( log ){
		if( log.length > maxEntries ) {
			log.splice(0,log.length - maxEntries);
		}
		return log;
	};
	return {
		addInfo: function( row ){
			this.add( getTime() + " INFO: "+row );
		},
		addError: function(row){
			this.add(getTime() + " ERROR: "+row);
		},
		add: function( row ) {
			var log = this.get();
			log[log.length] = row;
			saveLog( ensureNotExceedingMax( log ) );
		},
		get: function() {
			var storedlog = localStorage[loglabel];
			if(storedlog === undefined || storedlog === null )
				return [];
			return JSON.parse( storedlog )
		}
	};
};

var myTorrent = new ChromeTorrent();
var myLog = makeLog();

function download(info, tab) {
try
{
  myTorrent.addTorrent(info.linkUrl);
  console.log("item " + info.linkUrl + " was clicked");
  myLog.addInfo( "clicked: " + info.linkUrl );
}
catch(e)
{
	myLog.addError( e.message );
}
}

  var title = "Send to uTorrent";
  var id = chrome.contextMenus.create({"title": title, "contexts":["link"],
                                       "onclick": download});


