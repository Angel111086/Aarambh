const fs = require("fs");
const express = require("express");
const multer = require("multer");
//const OAuth2Data = require("../client_secret11.json");
const OAuth2Data = require("../client_secret11.json");
var title, description;
var tags = [];

const { google } = require("googleapis");

const app = express();

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
var authed = false;

const SCOPES =
  "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube";


const Authorize = function() {   
  
  
}

var playlistId, videoId;

  Authorize.Validate = function(req, res, result) {
  if (!authed) {
    // Generate an OAuth URL and redirect there
    var url = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      approval_prompt:'force'
    });
    //console.log(url);
    //res.render("index", { url: url });
    result(null, {"Message":url});
  }
  else {
    var oauth2 = google.oauth2({
      auth: oAuth2Client,
      version: "v2",
    });
    oauth2.userinfo.get(function (err, response) 
    {
      if (err) {
        console.log(err);
      } 
      else {
        console.log(response.data);
        name = response.data.name;
        pic = response.data.picture;
        //res.render("success", {
        console.log("success",
          response.data.name,
          response.data.picture,
          false,
        );
        result(null, {"Message":response.data});
      }
    });
  }
};


Authorize.Callback =  function (code, res) {
  //const code = req.query.code;
  if (code) {
    // Get an access token based on our OAuth code
    oAuth2Client.getToken(code, function (err, tokens) {
      if (err) {
        console.log("Error authenticating");
        console.log(err);
      } else {
        console.log("Successfully authenticated");
        console.log(tokens);
        oAuth2Client.setCredentials(tokens);

  //      oAuth2Client.on('tokens', (tokens) => {
  // 			if (tokens.refresh_token) {
  //   			// store the refresh_token in my database!
  //   			console.log(tokens.refresh_token);
  // 			}
  // 			console.log(tokens.access_token);
		// });

       	
  //      	oAuth2Client.setCredentials({
  // 			refresh_token: tokens
		// });

        
        authed = true;
        res(null, authed);
        //res.redirect("/");
      }
    });
  }
};


Authorize.createPlaylist = function(title, desc, result)
{
  const youtube = google.youtube({ version: "v3", auth: oAuth2Client });
  youtube.playlists.insert
  ({
            part: 'id,snippet, status',
            resource: {
                snippet: {
                    title: title,
                    description: desc,
                },
                status: {
                    privacyStatus: "public"
                }
            }
        }, 
        function (err, data, response) 
        {
            if (err) 
            {
                console.log('Error: ' + err);
            }
            else if (data) 
            {
                playlistId = data.data.id;
                console.log(data.data.id);
                console.log(data.data.snippet.title);
                console.log(data.data.snippet.description);
                result(null, {id: data.data.id, title: data.data.snippet.title, description: data.data.snippet.description });
            }
            if (response) 
            {
                console.log('Status code: ' + response.statusCode);
            }
          }
);
}




const publishDate = new Date("2020-08-27 15:20:00");
Authorize.Upload = function (file, title,desc, tags, thumbnail, result) {
    // if (err) 
    // {
    //   console.log(err);
    //   return res.end("Something went wrong");
    // } 
    // else {
      console.log('File in Model',file);
      title = title;
      description = desc;
      tags = tags;
      console.log(title);
      console.log(description);
      console.log(tags);
      console.log(thumbnail);
      const youtube = google.youtube({ version: "v3", auth: oAuth2Client });
      //console.log(youtube)

      youtube.videos.insert(
        {
          resource: {
            // Video title and description
            snippet: {
                title:title,
                description:description,
                tags:tags,
            },
            // I don't want to spam my subscribers
            status: {
              privacyStatus: "private",
              publishAt: publishDate //Scheduled Testing
            },
          },
          // This is for the callback function
          part: "snippet,status",

          // Create the readable stream to upload the video
          media: {
            body: fs.createReadStream(file)
          },
        },
        (err, data) => {
          if(err)
          { 
            throw err
          }
          else{
          console.log(data)
          console.log("Done.");
          videoId = data.id;
          uploadThumbnail(youtube,data, thumbnail);
          fs.unlinkSync(file);
          //res.render("success", { name: name, pic: pic, success: true });
          result(null, {status:"success", send: data });
        }
      }
      );

	

}
 //};

function uploadThumbnail(yt, data, tn){
	yt.thumbnails.set(
   	{
     //auth: auth,
     videoId: data.data.id,
     media: {
       mimeType: 'image/jpeg',
       body: fs.createReadStream(tn)
       //body: fs.readFileSync(tn)
     },
   },
   (err, thumbResponse) => {
     if (err) {
       console.log("Error response");
       console.log(err);
       //process.exit(1);
     }
     console.log("thumbnail uploaded");
     console.log(thumbResponse);
   }
 );

// yt.thumbnails(data.data.id, { 
//     mimeType: 'image/jpg', 
//     body: fs.createReadStream(tn) 
//   }, function (err) {
//     if (err) 
//     	{
//     		console.error('Cannot define the thumbnail')
//     	}

//   })


}

Authorize.addVideoToPlaylist = function(playlistId, videoId, result)
{
    const youtube = google.youtube({ version: "v3", auth: oAuth2Client });
    youtube.playlistItems.insert({
            part: 'id,snippet',
            resource: {
                snippet: {
                    playlistId: playlistId,
                    resourceId:{
                        videoId: videoId,
                        kind:"youtube#video"
                    }
                }
            }
        }, function (err, data, response) {
            if (err) {
                console.log('Error: ' + err);
            }
            else if (data) {
                console.log(data);
            }
            if (response) {
                console.log('Status code: ' + response.statusCode);
            }
        });
}


module.exports= Authorize;