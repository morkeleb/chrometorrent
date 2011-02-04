// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
var token = "tt";

$.get(localStorage["host"] + "token.html", function(data){
token = $(data).first().first().html();});

function createTorrentUrl(info) {
	return localStorage["host"] + "?token=" + token + "&action=add-url&s=" + escape(info.linkUrl);
}

function download(info, tab) {
  $.get(createTorrentUrl(info));
  console.log("item " + info.linkUrl + " was clicked");
}

  var title = "Download with uTorrent";
  var id = chrome.contextMenus.create({"title": title, "contexts":["link"],
                                       "onclick": download});


