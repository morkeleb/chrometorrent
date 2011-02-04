// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function download(info, tab) {
  console.log("item " + info.linkUrl + " was clicked");
}

  var title = "Download with uTorrent";
  var id = chrome.contextMenus.create({"title": title, "contexts":["link"],
                                       "onclick": download});


