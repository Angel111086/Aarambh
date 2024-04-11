var mysql = require('mysql');
const pool = require('../lib/pool');

// constructor
const LiveRecordingDetail = function(liverecording) {
  this.StreamName = liverecording.StreamName;
  this.VodName = liverecording.VodName;
  this.StreamId  = liverecording.StreamId;
  this.CreationDate = liverecording.CreationDate;
  this.Duration = liverecording.Duration;
  this.FileSize = liverecording.FileSize;
  this.FilePath = liverecording.FilePath;
  this.VodId = liverecording.VodId;
  this.type = liverecording.type;
  this.StatusId = liverecording.StatusId;
  this.CreatedById = liverecording.CreatedById;
  this.CreationDatee  = new Date();
  this.ModifiedById = liverecording.ModifiedById;  
  this.ModificationDate = liverecording.ModificationDate;
};

LiveRecordingDetail.createDetail = function (details, result) {    
        pool.query("INSERT INTO liverecordingdeatail SET ?", details, function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);         
                    result(null, {"Message":"LiveRecordingDetail Saved Successfully."});

                }
            });           
};


LiveRecordingDetail.updateDetail = function (details, id, result) {    
        pool.query("UPDATE liverecordingdeatail SET StreamName = ?, VodName = ?, StreamId = ?, CreationDate = ?, Duration=?,"+
          +"FileSize = ?, FilePath = ?, VodId = ?, type = ?, StatusId = ? WHERE liverecordingdetailid = ?", 
          [details.StreamName, details.VodName, details.StreamId, details.CreationDate, details.Duration,
          details.FileSize, details.FilePath, details.VodId,details.type, details.StatusId, id], function (err, res) {                
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);         
                    result(null, {"Message":"LiveRecordingDetail updated Successfully."});

                }
            });           
};


module.exports = LiveRecordingDetail;