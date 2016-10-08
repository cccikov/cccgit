/*
 * 网络爬虫
 */
function method1(){//自己写的
    var http = require('http');
    var cheerio = require("cheerio");
    var url = 'http://www.imooc.com/learn/348';

    http.get(url, function(res) {
        var html = '';

        res.on("data", function(data) {
            html += data;
        });

        res.on('end', function() {
            // console.log(html);
            filter(html);
        });
    }).on('error', function() {
        console.log("获取出错");
    });

    function filter(html){
        var $ = cheerio.load(html);
        var course = [];
        if($(".chapter").length>0){
            $(".chapter").each(function(item,key){
                var that = $(key) || $(this);

                var bigT = that.find('strong').text().replace(/\s+/g, ' ');
                course.push({
                    "BigTitle":bigT
                });

            });
            console.log(course);
        }
    }
}

function method2(){//他人写的
    var http = require('http');
    var cheerio = require('cheerio');
    var url = 'http://www.imooc.com/learn/348';

    function filterChapters(html){
        var $ = cheerio.load(html);
        $('.chapter-content').remove();
        $('.moco-btn').remove();
        var chapters = $('.chapter');
        // console.log(chapters.html());

        var courseData = [];
        chapters.each(function(item){
            var chapter = $(this);
            chapter.find('.chapter-content').remove;
            var chapterTitle = chapter.find('strong').text().trim();
            // console.log(chapterTitle);
            var videos = chapter.find('.video').children('li')

            var chapterData = {
                chapterTitle:chapterTitle,
                videos:[]
            }

           videos.each(function(item){
              var video = $(this);
              var videoTitle = video.find('.J-media-item').text().replace(/\s+/g,' ');
              // console.log(videoTitle);
              var id = video.find('.J-media-item').attr('href').split('video/')[1];

              chapterData.videos.push({
                    title:videoTitle,
                    id:id
              })
           })
            courseData.push(chapterData);
        })
        return courseData;
    }

    function printCourseInfo(courseData){
        courseData.forEach(function(item){
            var chapterTitle = item.chapterTitle;
            console.log(chapterTitle + '\n');
            item.videos.forEach(function(video){
                console.log('  【' + video.id + '】' + video.title + '\n');
            })
        })
    }

    http.get(url,function(res){
        var html = '';
        res.on('data',function(data){
            html += data;
        })
        res.on('end',function(){
            var courseData = filterChapters(html);
            printCourseInfo(courseData);
        })
    }).on('error',function(){
        console.log('获取数据出错！');
    })
}
method1();
method2();