//var socket = io();

//the following values are placeholders to be received from the server on page initialization
//playerNumber is directly used as index, so ranges from 0 to 3
var playerNumber = 1;
var commName = ['Ruby Blank', 'Weiss Blank', 'Blake Blank', 'Yang Xiao-Blank'];
var kingdom = [0, 1, 2, 3];
//var kingdomByPlayer = ['Mantle', 'Mistral', 'Vacuo', 'Vale'];
//playerByKingdom are the player numbers (0-3) that control which kingdom
//order: 0=Mantle, 1=Mistral, 2=Vacuo, 3=Vale
var playerByKingdom = [0,1,2,3];

var nOfCards = [-1,-1,-1,-1,-99];
var kingdomPicArray = ['images/Atlas_Symbol.svg.png', 'images/Mistral_Symbol.svg.png', 'images/Vacuo_Symbol.svg.png', 'images/Vale_Symbol.svg.png'];
var kingdomColorArray = ['white', 'lightblue', 'orange', 'green'];
var common = 4;
var uncommon = 3;
var rare = 2;
var unitImage = 'images/Ralph_unit_card.jpg';
var trapImage = 'images/Its_a_trap_card.jpg';
var utilityImage = 'images/Ralph_unit_card.jpg';
var territoryShapeInfo = [
	/*[{x:10,y:0},{x:20,y:0},{x:20,y:100},{x:10,y:100},{x:0,y:0}],
	[{x:30,y:0},{x:40,y:0},{x:40,y:100},{x:30,y:100},{x:0,y:0}],
	[{x:50,y:0},{x:60,y:0},{x:60,y:100},{x:50,y:100},{x:0,y:0}],
	[{x:70,y:0},{x:80,y:0},{x:80,y:100},{x:70,y:100},{x:0,y:0}],
	[{x:90,y:0},{x:100,y:0},{x:100,y:100},{x:90,y:100},{x:0,y:0}],
	[{x:0,y:10},{x:100,y:10},{x:100,y:20},{x:0,y:20},{x:0,y:0}],
	[{x:0,y:30},{x:100,y:30},{x:100,y:40},{x:0,y:40},{x:0,y:0}],
	[{x:0,y:50},{x:100,y:50},{x:100,y:60},{x:0,y:60},{x:0,y:0}],
	[{x:0,y:70},{x:100,y:70},{x:100,y:80},{x:0,y:80},{x:0,y:0}],
	[{x:0,y:90},{x:100,y:90},{x:100,y:100},{x:0,y:100},{x:0,y:0}],*/
	//end of grid lines
	[{x:18.5,y:26.5},{x:20.5,y:18},{x:25,y:20.5},{x:27.5,y:21.5},{x:26.5,y:26},{x:24.5,y:24.5},{x:20,y:29},{x:23,y:23}],
	[{x:27.5,y:21.5},{x:29,y:20},{x:30.5,y:23.5},{x:33,y:25},{x:33,y:31.5},{x:27,y:29},{x:26.5,y:26},{x:30,y:25.75}],
	[{x:29,y:20},{x:28,y:16},{x:29,y:10.5},{x:35,y:9},{x:39.5,y:9.5},{x:41,y:10},{x:40.5,y:12},{x:35,y:13},{x:35,y:15},{x:40,y:18},{x:40,y:20.5},{x:35,y:19.5},{x:32,y:17.5},{x:29,y:20},{x:32.5,y:13.5}],
	[{x:29,y:20},{x:32,y:17.5},{x:35,y:19.5},{x:35,y:21},{x:39.5,y:26},{x:39.5,y:28},{x:37.5,y:27.5},{x:37,y:26},{x:33.5,y:23},{x:33,y:25},{x:30.5,y:23.5},{x:33,y:21}],
	[{x:33,y:28},{x:45,y:34.5},{x:45,y:36.5},{x:40,y:36.5},{x:33,y:31.5},{x:40,y:33.5}],
	[{x:27,y:29},{x:33,y:31.5},{x:32.5,y:42},{x:24,y:36},{x:24.5,y:31.5},{x:29.5,y:34}],
	[{x:33,y:31.5},{x:40,y:36.5},{x:40,y:40.5},{x:38,y:43},{x:36.5,y:40.5},{x:34,y:40.5},{x:32.5,y:42},{x:37,y:37}],
	[{x:25.5,y:37},{x:32.5,y:42},{x:31,y:50},{x:29.5,y:50.5},{x:26.5,y:45},{x:25.5,y:40},{x:29.5,y:43}],
	//end of dragon island
	[{x:17.5,y:35},{x:18.5,y:35},{x:19,y:41.5},{x:23,y:43},{x:22,y:51},{x:16,y:51},{x:17,y:45},{x:20,y:46}],
	[{x:23,y:43},{x:27,y:48.5},{x:28,y:53},{x:28,y:56},{x:24,y:56},{x:23.5,y:54.5},{x:22,y:51},{x:25.5,y:51}],
	[{x:16,y:51},{x:22,y:51},{x:23.5,y:54.5},{x:21,y:59.5},{x:14.5,y:59.5},{x:14.5,y:55},{x:19,y:55}],
	[{x:14.5,y:59.5},{x:21,y:59.5},{x:21,y:67.5},{x:18,y:69},{x:19,y:75},{x:21.5,y:77},{x:20.5,y:80.5},{x:16,y:79},{x:14,y:70},{x:14,y:64},{x:18,y:64}],
	[{x:23.5,y:54.5},{x:24,y:56},{x:27,y:56},{x:27,y:62},{x:24,y:70},{x:22.5,y:70},{x:21,y:67.5},{x:21,y:59.5},{x:24,y:62}],
	[{x:27,y:62},{x:27,y:61},{x:30.3,y:61},{x:30.3,y:70},{x:27.5,y:70},{x:25.5,y:66},{x:29,y:65}],
	[{x:25.5,y:66},{x:27.5,y:70},{x:30.3,y:70},{x:30.3,y:77},{x:27,y:78.5},{x:24.5,y:75},{x:24,y:70},{x:28,y:73}],
	//end of vacuo
	[{x:30.3,y:61},{x:34,y:60},{x:35,y:69},{x:36,y:76},{x:35,y:77.5},{x:31.5,y:77.5},{x:30.3,y:77},{x:33,y:69}],
	[{x:34,y:60},{x:40,y:54},{x:43.5,y:54},{x:45,y:59},{x:45,y:63},{x:41,y:68},{x:35,y:69},{x:40,y:61}],
	[{x:35,y:69},{x:41,y:68},{x:45,y:63},{x:45,y:59},{x:47,y:57},{x:48,y:64},{x:47,y:67},{x:43,y:74},{x:39,y:74},{x:36,y:76},{x:42,y:70}],
	[{x:40,y:54},{x:38.5,y:47},{x:39,y:46},{x:45,y:46},{x:47.5,y:48},{x:49,y:49},{x:49,y:55},{x:47,y:57},{x:45,y:59},{x:43.5,y:54},{x:44.5,y:51}],
	[{x:47,y:57},{x:49,y:55},{x:49,y:52},{x:52,y:49},{x:55.5,y:49},{x:55.5,y:52},{x:50.5,y:63.5},{x:48,y:64},{x:51.5,y:55}],
	[{x:42,y:46},{x:43,y:41},{x:45.5,y:38.5},{x:50.5,y:39.5},{x:50,y:44},{x:47.5,y:48},{x:45,y:46},{x:46.5,y:42.5}],
	[{x:50.5,y:39.5},{x:53.5,y:41},{x:53,y:49},{x:52,y:49},{x:49,y:52},{x:49,y:49},{x:47.5,y:48},{x:50,y:44},{x:52,y:44}],
	[{x:47.5,y:34},{x:48,y:28},{x:50.5,y:28.5},{x:52,y:31},{x:52.5,y:36},{x:51.5,y:37},{x:50,y:37},{x:50,y:32.5}],
	[{x:30,y:84},{x:30,y:82},{x:32,y:81.5},{x:35,y:81.5},{x:36,y:80.5},{x:38,y:80},{x:38.5,y:81},{x:38,y:82.5},{x:34.5,y:84.5},{x:35,y:82.5}],
	[{x:41.5,y:90},{x:41.5,y:88},{x:47,y:85.5},{x:47.5,y:87},{x:47,y:88.5},{x:44,y:91},{x:44.5,y:88.5}],
	//end of vale
	[{x:42.5,y:10},{x:42,y:8},{x:42,y:7.5},{x:43,y:7},{x:48,y:6.5},{x:53,y:7},{x:54,y:8},{x:55.5,y:13},{x:53.5,y:14},{x:49.5,y:12},{x:49,y:10.5},{x:52,y:10}],
	[{x:55.5,y:13},{x:54,y:8},{x:55,y:7},{x:57.5,y:7},{x:59.5,y:7.5},{x:61.5,y:6.5},{x:62.5,y:6.5},{x:63.5,y:8.5},{x:63.5,y:10},{x:58,y:13},{x:58,y:10}],
	[{x:58,y:13},{x:63.5,y:10},{x:63.5,y:8.5},{x:64.5,y:8.5},{x:65,y:13},{x:66.5,y:19},{x:66,y:20},{x:65,y:21},{x:64.5,y:19},{x:63,y:19.5},{x:62,y:15.5},{x:59.5,y:17},{x:63.5,y:13.5}],
	[{x:44,y:21},{x:44,y:20},{x:47.5,y:13},{x:49.5,y:12},{x:51.5,y:13},{x:49.5,y:18.5},{x:48.5,y:20},{x:45,y:21.5},{x:48.5,y:16}],
	[{x:48.5,y:20},{x:49.5,y:18.5},{x:51.5,y:13},{x:53.5,y:14},{x:53.5,y:15},{x:53,y:18.5},{x:53,y:21.5},{x:52.5,y:23.5},{x:48.5,y:24},{x:48,y:22},{x:51.5,y:19}],
	[{x:53,y:21.5},{x:53,y:18.5},{x:53.5,y:15},{x:53.5,y:14},{x:55.5,y:13},{x:58,y:13},{x:59.5,y:17},{x:58.5,y:19.5},{x:57,y:21.5},{x:56,y:17}],
	//end of mantle
	[{x:53,y:77},{x:53.5,y:74},{x:56,y:73.5},{x:57.5,y:75},{x:58.5,y:74},{x:57.5,y:64.5},{x:58,y:63},{x:61,y:62},{x:62,y:63.5},{x:61,y:67},{x:62,y:76},{x:61,y:78},{x:57,y:79},{x:60,y:70}],
	[{x:57.5,y:64.5},{x:57,y:62},{x:57.5,y:58},{x:58.5,y:55},{x:58.5,y:53},{x:57,y:49},{x:57.5,y:46},{x:62.5,y:45.5},{x:64.5,y:48},{x:64,y:52},{x:64,y:57.5},{x:62,y:63.5},{x:61,y:62},{x:58,y:63},{x:61.5,y:54.5}],
	[{x:57.5,y:46},{x:61,y:35},{x:68,y:33},{x:70,y:35},{x:70,y:38},{x:68,y:41.5},{x:66,y:40},{x:62.5,y:42},{x:62.5,y:45.5},{x:64,y:37.5}],
	[{x:68,y:41.5},{x:70,y:38},{x:72,y:38},{x:71.5,y:32},{x:75,y:28.5},{x:78,y:29.5},{x:77.5,y:32},{x:75,y:33.5},{x:74,y:39},{x:73,y:41.5},{x:74.5,y:43},{x:74.5,y:45},{x:68,y:45.5},{x:66,y:44.5},{x:66,y:43.5},{x:71.5,y:41}],
	[{x:62,y:63.5},{x:64,y:57.5},{x:64,y:52},{x:64.5,y:48},{x:66,y:49.5},{x:68,y:47.5},{x:68,y:45.5},{x:74.5,y:45},{x:76.5,y:47.5},{x:76,y:52},{x:72.5,y:53},{x:67,y:63},{x:65,y:64},{x:63.5,y:64},{x:68.5,y:53}],
	[{x:67,y:63},{x:72.5,y:53},{x:74,y:52.5},{x:74,y:58},{x:75,y:62},{x:73.5,y:66},{x:73.5,y:68.5},{x:71.5,y:69.5},{x:66.5,y:68},{x:71.5,y:62}],
	[{x:75,y:62},{x:74,y:58},{x:74,y:52.5},{x:76,y:52},{x:80,y:54},{x:83,y:53},{x:85,y:51},{x:85.5,y:51},{x:86,y:58},{x:85,y:64},{x:84,y:64},{x:82,y:62},{x:80,y:58}],
	//end of mistral
	[{x:67,y:93.5},{x:68,y:87},{x:69,y:86},{x:69,y:84.5},{x:65.5,y:83},{x:65.5,y:82},{x:67.5,y:81},{x:72.5,y:81},{x:72.5,y:86.5},{x:69.5,y:89},{x:68,y:93.5},{x:71,y:84}],
	[{x:72.5,y:86.5},{x:72.5,y:81},{x:74,y:79},{x:78,y:79},{x:79,y:83},{x:75.5,y:86.5},{x:75.5,y:82}],
	[{x:78,y:79},{x:80,y:75},{x:81.5,y:75.5},{x:82,y:78},{x:84,y:79.5},{x:84.5,y:82},{x:83,y:83},{x:79,y:83},{x:81,y:79.5}],
	[{x:75,y:89},{x:75.5,y:86.5},{x:79,y:83},{x:83,y:83},{x:84.5,y:82},{x:85,y:83},{x:85,y:84.5},{x:81,y:90},{x:75.5,y:90},{x:80,y:86}],
	//end of menagerie, rest is water
	[{x:20.5,y:18},{x:21,y:14},{x:25,y:13.5},{x:28.5,y:13.5},{x:28,y:16},{x:29,y:20},{x:27.5,y:21.5},{x:25,y:20.5},{x:25.5,y:16.5}],
	[{x:21,y:14},{x:20.5,y:8},{x:25.5,y:7},{x:30,y:7.5},{x:30.5,y:10},{x:29,y:10.5},{x:28.5,y:13.5},{x:25,y:13.5},{x:25.5,y:10}],
	[{x:30,y:7.5},{x:30.5,y:5},{x:34,y:4.5},{x:40,y:5},{x:39.5,y:9.5},{x:35,y:9},{x:30.5,y:10},{x:35,y:6.5}],
	[{x:39.5,y:9.5},{x:40,y:5},{x:41,y:4},{x:42.5,y:4.5},{x:43,y:7},{x:42,y:7.5},{x:42,y:8},{x:42.5,y:10},{x:49,y:10.5},{x:49.5,y:12},{x:47.5,y:13},{x:45.5,y:17},{x:42.5,y:15.5},{x:40.5,y:12},{x:41,y:10},{x:44.5,y:13}],
	[{x:43,y:7},{x:42.5,y:4.5},{x:42.5,y:3},{x:48,y:2.5},{x:53,y:4},{x:56,y:3.5},{x:58.5,y:5},{x:58,y:7},{x:55,y:7},{x:54,y:8},{x:53,y:7},{x:48,y:6.5},{x:50,y:4.5}],
	[{x:58,y:7},{x:58.5,y:5},{x:57,y:4},{x:57.5,y:3},{x:63,y:3},{x:65,y:4},{x:67,y:6.5},{x:67,y:10.5},{x:66.5,y:12.5},{x:65,y:13},{x:64.5,y:8.5},{x:63.5,y:8.5},{x:62.5,y:6.5},{x:61.5,y:6.5},{x:59.5,y:7.5},{x:64,y:5.5}],
	[{x:65,y:13},{x:66.5,y:12.5},{x:67,y:10.5},{x:68.5,y:10.5},{x:69.5,y:13},{x:70,y:19},{x:68.5,y:22},{x:67,y:21.5},{x:66,y:20},{x:66.5,y:19},{x:65,y:13},{x:68,y:16}],
	[{x:57,y:21.5},{x:58.5,y:19.5},{x:59.5,y:17},{x:62,y:15.5},{x:63,y:19.5},{x:64.5,y:19},{x:65,y:21},{x:66,y:20},{x:67,y:21.5},{x:64,y:25},{x:59.5,y:25.5},{x:61.5,y:21}],
	//end of naval 40's
	[{x:50.5,y:28.5},{x:50.5,y:23.75},{x:52.5,y:23.5},{x:53,y:21.5},{x:57,y:21.5},{x:59.5,y:25.5},{x:57.5,y:30},{x:52,y:31},{x:55,y:26}],
	[{x:35,y:15},{x:35,y:13},{x:40.5,y:12},{x:42.5,y:15.5},{x:45.5,y:17},{x:44,y:20},{x:40,y:20},{x:40,y:18},{x:40,y:14.5}],
	[{x:35,y:21},{x:35,y:19.5},{x:40,y:20.5},{x:40,y:20},{x:44,y:20},{x:44,y:21},{x:45,y:21.5},{x:44,y:24},{x:43,y:26},{x:39.5,y:26},{x:41.5,y:23}],
	[{x:45,y:36.5},{x:45,y:34.5},{x:44,y:34},{x:45,y:29.5},{x:43,y:26},{x:44,y:24},{x:45,y:21.5},{x:48.5,y:20},{x:48,y:22},{x:48.5,y:24},{x:50.5,y:23.75},{x:50.5,y:28.5},{x:48,y:28},{x:47.7,y:32},{x:46,y:32.5},{x:45.8,y:36},{x:46.5,y:26}],
	[{x:33,y:25},{x:33.5,y:23},{x:37,y:26},{x:37.5,y:27.5},{x:39.5,y:28},{x:39.5,y:26},{x:43,y:26},{x:45,y:29.5},{x:44,y:34},{x:33,y:28},{x:42.5,y:29.5}],
	[{x:39,y:46},{x:38,y:43},{x:40,y:40.5},{x:40,y:36.5},{x:45,y:36.5},{x:45.8,y:36},{x:45.5,y:38.5},{x:43,y:41},{x:42,y:46},{x:42,y:40}],
	[{x:35.5,y:40.5},{x:36.5,y:40.5},{x:38,y:43},{x:39,y:46},{x:38.5,y:47},{x:40,y:54},{x:37,y:57},{x:35.5,y:51},{x:37.5,y:48.5}],
	[{x:32,y:60.5},{x:32,y:54},{x:31,y:50},{x:32.5,y:42},{x:34,y:40.5},{x:35.5,y:40.5},{x:35.5,y:51},{x:37,y:57},{x:34,y:60},{x:33.75,y:50}],
	[{x:27,y:61},{x:27,y:56},{x:28,y:56},{x:28,y:53},{x:27,y:48.5},{x:27.5,y:47},{x:29.5,y:50.5},{x:31,y:50},{x:32,y:54},{x:32,y:60.5},{x:30.3,y:61},{x:30,y:55}],
	[{x:21,y:42.25},{x:21,y:36},{x:24,y:36},{x:25.5,y:37},{x:25.5,y:40},{x:26.5,y:45},{x:27.5,y:47},{x:27,y:48.5},{x:23,y:43},{x:23.5,y:39.5}],
	//end of naval 50's
	[{x:20,y:29},{x:24.5,y:24.5},{x:26.5,y:26},{x:27,y:29},{x:24.5,y:31.5},{x:24,y:36},{x:22.5,y:36},{x:23,y:33},{x:22.5,y:30},{x:21.5,y:29.5},{x:20.5,y:30},{x:24.5,y:28}],
	[{x:17.5,y:35},{x:16,y:33},{x:15.5,y:28},{x:16,y:24},{x:17.5,y:22.5},{x:19.5,y:22.5},{x:18.5,y:26.5},{x:20,y:29},{x:20.5,y:30},{x:21,y:32},{x:21,y:42.25},{x:19,y:41.5},{x:18.5,y:35},{x:18.5,y:30}],
	[{x:16,y:24},{x:14,y:18},{x:13,y:11},{x:16,y:5},{x:18.5,y:3.5},{x:22.5,y:3.5},{x:23,y:7.5},{x:20.5,y:8},{x:21,y:14},{x:20.5,y:18},{x:19.5,y:22.5},{x:17.5,y:22.5},{x:17.5,y:13}],
	[{x:5.5,y:19},{x:5,y:14},{x:6,y:8},{x:11,y:5},{x:15,y:7},{x:13,y:11},{x:14,y:18},{x:11,y:18},{x:8,y:21},{x:10,y:13}],
	[{x:8,y:29},{x:8,y:21},{x:11,y:18},{x:14,y:18},{x:16,y:24},{x:15.5,y:28},{x:16,y:33},{x:12.5,y:36},{x:9.5,y:34},{x:12.5,y:26}],
	[{x:7,y:38},{x:8,y:34},{x:9,y:32.5},{x:9.5,y:34},{x:12.5,y:36},{x:16,y:33},{x:17.5,y:35},{x:17,y:45},{x:11,y:44.5},{x:8,y:42},{x:13,y:40}],
	[{x:3,y:32},{x:3.5,y:23},{x:4,y:19.5},{x:5.5,y:19},{x:8,y:21},{x:8,y:29},{x:9,y:32.5},{x:9,y:32.5},{x:8,y:34},{x:7,y:38},{x:4.5,y:37.5},{x:6,y:28}],
	[{x:2.5,y:43},{x:2.5,y:40},{x:4.5,y:37.5},{x:7,y:38},{x:8,y:42},{x:6,y:44.5},{x:4,y:45},{x:5.5,y:41}],
	[{x:3,y:52},{x:3,y:47},{x:4,y:45},{x:6,y:44.5},{x:8,y:42},{x:11,y:44.5},{x:10,y:51},{x:8,y:54},{x:5,y:55},{x:7,y:49}],
	[{x:10,y:51},{x:11,y:44.5},{x:17,y:45},{x:16,y:51},{x:14.5,y:55},{x:12,y:54},{x:13.5,y:49.5}],
	//end of naval 60's
	[{x:8,y:54},{x:10,y:51},{x:12,y:54},{x:14.5,y:55},{x:14.5,y:59.5},{x:10.5,y:60.5},{x:8.5,y:58.5},{x:11,y:56.5}],
	[{x:2,y:59},{x:2.5,y:56},{x:4,y:53.5},{x:5,y:55},{x:8,y:54},{x:8.5,y:58.5},{x:6.5,y:62},{x:3.5,y:62},{x:5.5,y:58}],
	[{x:3,y:66},{x:3.5,y:62},{x:6.5,y:62},{x:8.5,y:58.5},{x:10.5,y:60.5},{x:10,y:66},{x:7,y:68},{x:7.5,y:64}],
	[{x:10.5,y:73},{x:10,y:66},{x:10.5,y:60.5},{x:14.5,y:59.5},{x:14,y:64},{x:14,y:70},{x:15.5,y:77},{x:12.5,y:79},{x:12.5,y:69}],
	[{x:4.5,y:76},{x:4,y:71},{x:5,y:67},{x:7,y:68},{x:10,y:66},{x:10.5,y:73},{x:11.5,y:76},{x:9,y:79},{x:8,y:72.5}],
	[{x:8.5,y:84},{x:9,y:79},{x:11.5,y:76},{x:12.5,y:79},{x:15.5,y:77},{x:16,y:79},{x:18.5,y:80},{x:18,y:85},{x:21,y:87},{x:21,y:91},{x:18,y:92},{x:11,y:90},{x:15,y:85}],
	[{x:10.5,y:95.5},{x:11,y:90},{x:18,y:92},{x:21,y:91},{x:21.5,y:93},{x:21,y:96.5},{x:18,y:95},{x:14,y:94.5},{x:16,y:93}],
	[{x:18,y:85},{x:18.5,y:80},{x:20.5,y:80.5},{x:27,y:82.5},{x:26.5,y:86.5},{x:24.5,y:85.5},{x:24,y:86.5},{x:21,y:87},{x:22.5,y:83.5}],
	[{x:21,y:96.5},{x:21.5,y:93},{x:21,y:91},{x:21,y:87},{x:24,y:86.5},{x:25,y:90},{x:26,y:90.5},{x:27.5,y:90},{x:30,y:90},{x:30.5,y:94},{x:29.5,y:97},{x:26,y:96},{x:26,y:93}],
	[{x:18,y:69},{x:21,y:67.5},{x:22.5,y:70},{x:24,y:70},{x:24.5,y:75},{x:25.5,y:76.5},{x:25,y:79.5},{x:21.5,y:77},{x:19,y:75},{x:22,y:73}],
	//end of naval 70's
	[{x:26.5,y:86.5},{x:27,y:82.5},{x:27,y:81},{x:25,y:79.5},{x:25.5,y:76.5},{x:27,y:78.5},{x:30.3,y:77},{x:31.5,y:77.5},{x:33.5,y:77.5},{x:34,y:81.5},{x:32,y:81.5},{x:30,y:82},{x:30,y:84},{x:34.5,y:84.5},{x:35,y:88},{x:34,y:89},{x:30,y:90},{x:27.5,y:90},{x:27,y:87.5},{x:29,y:84}],
	[{x:33.5,y:77.5},{x:35,y:77.5},{x:36,y:76},{x:39,y:74},{x:43,y:74},{x:43.5,y:78},{x:41,y:80},{x:38.5,y:81},{x:38,y:80},{x:36,y:80.5},{x:35,y:81.5},{x:34,y:81.5},{x:39,y:77.5}],
	[{x:34.5,y:84.5},{x:38,y:82.5},{x:38.5,y:81},{x:41,y:80},{x:43.5,y:78},{x:44,y:82},{x:40.5,y:85},{x:38.5,y:88},{x:36.5,y:89},{x:35,y:88},{x:39.5,y:83.5}],
	[{x:29.5,y:97},{x:30.5,y:94},{x:30,y:90},{x:34,y:89},{x:35,y:88},{x:36.5,y:89},{x:38.5,y:88},{x:39,y:92},{x:37.5,y:95.5},{x:33.5,y:97},{x:34.5,y:92.5}],
	[{x:39,y:92},{x:38.5,y:88},{x:40.5,y:85},{x:44,y:82},{x:47,y:81.5},{x:47,y:85.5},{x:41.5,y:88},{x:41.5,y:90},{x:40.5,y:92},{x:44,y:84.5}],
	[{x:37.5,y:95.5},{x:39,y:92},{x:40.5,y:92},{x:41.5,y:90},{x:44,y:91},{x:47,y:88.5},{x:47.5,y:92},{x:47,y:94.5},{x:44,y:96},{x:41,y:96.5},{x:43,y:93}],
	[{x:44,y:82},{x:43,y:74},{x:45,y:70.5},{x:47.5,y:76},{x:47.5,y:79},{x:47,y:81.5},{x:45.5,y:76.5}],
	[{x:45,y:70.5},{x:47,y:67},{x:48,y:64},{x:50.5,y:63.5},{x:52,y:67},{x:52,y:72},{x:50,y:76},{x:47.5,y:76},{x:49,y:70}],
	[{x:52,y:72},{x:52,y:67},{x:54.5,y:63},{x:57,y:62},{x:57.5,y:64.5},{x:58.5,y:74},{x:57.5,y:75},{x:56,y:73.5},{x:53.5,y:74},{x:55.5,y:69}],
	[{x:50.5,y:63.5},{x:55.5,y:52},{x:55.5,y:49},{x:57,y:49},{x:58.5,y:53},{x:58.5,y:55},{x:57.5,y:58},{x:57,y:62},{x:54.5,y:63},{x:52,y:67},{x:55.5,y:58}],
	//end of naval 80's
	[{x:62.5,y:45.5},{x:62.5,y:42},{x:66,y:40},{x:68,y:41.5},{x:66,y:43.5},{x:66,y:44.5},{x:68,y:45.5},{x:68,y:47.5},{x:66,y:49.5},{x:64.5,y:48},{x:65,y:44}],
	[{x:55,y:41},{x:56,y:36},{x:59,y:33},{x:61,y:35},{x:57.5,y:46},{x:57,y:49},{x:55.5,y:49},{x:55.5,y:46.5},{x:56,y:45},{x:56,y:43},{x:58,y:38.5}],
	[{x:50.5,y:39.5},{x:50.5,y:37},{x:51.5,y:37},{x:52.5,y:36},{x:52,y:31},{x:57.5,y:30},{x:59,y:33},{x:56,y:36},{x:55,y:41},{x:53.5,y:41},{x:54.5,y:35}],
	[{x:57.5,y:30},{x:59.5,y:25.5},{x:64,y:25},{x:63.5,y:29.5},{x:64.5,y:34},{x:61,y:35},{x:59,y:33},{x:61.5,y:30}],
	[{x:63.5,y:29.5},{x:64,y:25},{x:67,y:21.5},{x:68.5,y:22},{x:68,y:26},{x:66.5,y:27},{x:66,y:30},{x:66.5,y:33.5},{x:64.5,y:34},{x:65.5,y:27}],
	[{x:66.5,y:33.5},{x:66,y:30},{x:66.5,y:27},{x:68,y:26},{x:70.5,y:27},{x:71.5,y:32},{x:72,y:38},{x:70,y:38},{x:70,y:35},{x:68,y:33},{x:69,y:30}],
	[{x:68,y:26},{x:68.5,y:22},{x:70,y:19},{x:72,y:20},{x:73.5,y:25},{x:73.5,y:30},{x:71.5,y:32},{x:70.5,y:27},{x:71,y:24}],
	[{x:73.5,y:30},{x:73.5,y:25},{x:72,y:20},{x:75.5,y:17},{x:78.5,y:20},{x:79,y:25},{x:78,y:29.5},{x:75,y:28.5},{x:76,y:23}],
	[{x:70,y:19},{x:69.5,y:13},{x:68.5,y:10.5},{x:72,y:9.5},{x:75,y:9.5},{x:76,y:13},{x:75.5,y:17},{x:72,y:20},{x:72.5,y:14}],
	[{x:67,y:10.5},{x:67,y:6.5},{x:69.5,y:5},{x:74,y:4},{x:77,y:5.5},{x:78,y:10.5},{x:76,y:13},{x:75,y:9.5},{x:72,y:9.5},{x:68.5,y:10.5},{x:73,y:7}],
	//end of naval 90's
	[{x:75.5,y:17},{x:76,y:13},{x:78,y:10.5},{x:77,y:5.5},{x:80,y:5},{x:81,y:17},{x:78.5,y:20},{x:78.5,y:14.5}],
	[{x:79,y:25},{x:78.5,y:20},{x:81,y:17},{x:80.5,y:11},{x:85,y:9.5},{x:88,y:11},{x:89,y:18},{x:87,y:23},{x:83,y:25},{x:84,y:17.5}],
	[{x:89,y:18},{x:88,y:11},{x:89,y:7},{x:93,y:6.5},{x:96,y:9.5},{x:96.5,y:14},{x:94,y:18},{x:91.5,y:19},{x:92,y:12.5}],
	[{x:87,y:23},{x:89,y:18},{x:91.5,y:19},{x:94,y:18},{x:96.5,y:14},{x:97.5,y:16},{x:97.5,y:22},{x:95.5,y:25.5},{x:92,y:28.5},{x:89.5,y:28.5},{x:92.5,y:22.5}],
	[{x:84,y:29.5},{x:83,y:25},{x:87,y:23},{x:89.5,y:28.5},{x:92,y:28.5},{x:93,y:33},{x:89.5,y:34},{x:87,y:30},{x:86.5,y:26.5}],
	[{x:74,y:39},{x:75,y:33.5},{x:77.5,y:32},{x:79,y:25},{x:83,y:25},{x:84,y:29.5},{x:80.5,y:31},{x:79.5,y:36},{x:77.5,y:39},{x:80.5,y:28}],
	[{x:77.5,y:39},{x:79.5,y:36},{x:80.5,y:31},{x:84,y:29.5},{x:87,y:30},{x:89.5,y:34},{x:90,y:37.5},{x:89,y:39},{x:87,y:35},{x:83,y:35},{x:82,y:39},{x:79.5,y:42},{x:84,y:32.5}],
	[{x:73,y:41.5},{x:74,y:39},{x:77.5,y:39},{x:79.5,y:42},{x:80.5,y:48},{x:80,y:54},{x:76,y:52},{x:76.5,y:47.5},{x:74.5,y:45},{x:74.5,y:43},{x:77.5,y:45}],
	[{x:80,y:45},{x:79.5,y:42},{x:82,y:39},{x:83,y:35},{x:87,y:35},{x:89,y:39},{x:89,y:43},{x:87,y:47},{x:83,y:47},{x:85,y:41}],
	[{x:80,y:54},{x:80.5,y:48},{x:80,y:45},{x:83,y:47},{x:87,y:47},{x:87,y:49.5},{x:85.5,y:51},{x:85,y:51},{x:83,y:53},{x:83,y:49.5}],
	//end of naval 100's
	[{x:87,y:49.5},{x:87,y:47},{x:89,y:43},{x:89,y:39},{x:90,y:37.5},{x:89.5,y:34},{x:93,y:33},{x:93.5,y:42},{x:91,y:48.5},{x:91,y:42}],
	[{x:91,y:48.5},{x:93.5,y:42},{x:93,y:33},{x:92,y:28.5},{x:95,y:26},{x:96.5,y:30},{x:97,y:42},{x:97,y:49},{x:93.5,y:50.5},{x:95,y:39}],
	[{x:86,y:58},{x:85.5,y:51},{x:87,y:49.5},{x:91,y:48.5},{x:93.5,y:50.5},{x:93,y:55},{x:90.5,y:58},{x:89.5,y:53}],
	[{x:91,y:63},{x:90.5,y:58},{x:93,y:55},{x:93.5,y:50.5},{x:97,y:49},{x:97,y:56},{x:95,y:61},{x:94.5,y:56.5}],
	[{x:84,y:68},{x:84,y:64},{x:85,y:64},{x:86,y:58},{x:90.5,y:58},{x:91,y:63},{x:91,y:68},{x:87.5,y:69},{x:88,y:63.5}],
	[{x:73.5,y:68.5},{x:73.5,y:68},{x:75.5,y:68.5},{x:77,y:68},{x:76.5,y:65.5},{x:73.5,y:66},{x:75,y:62},{x:82,y:62},{x:84,y:64},{x:84,y:68},{x:81,y:70},{x:75.5,y:70},{x:80,y:66}],
	[{x:74,y:79},{x:74,y:73},{x:75.5,y:70},{x:80,y:70},{x:80,y:75},{x:78,y:79},{x:77,y:74.5}],
	[{x:67.5,y:81},{x:69,y:75.5},{x:71.5,y:75},{x:71.5,y:69.5},{x:73.5,y:68.5},{x:75.5,y:70},{x:74,y:73},{x:74,y:79},{x:72.5,y:81},{x:71.5,y:78}],
	[{x:65.5,y:82},{x:65,y:78},{x:66.5,y:68},{x:71.5,y:69.5},{x:71.5,y:71},{x:69,y:73},{x:69,y:75.5},{x:67.5,y:81},{x:67.5,y:75}],
	[{x:62,y:76},{x:61,y:67},{x:62,y:63.5},{x:63.5,y:64},{x:65,y:64},{x:67,y:63},{x:66.5,y:68},{x:65,y:78},{x:64,y:70}],
	//end of naval 110's
	[{x:57.5,y:84},{x:57,y:79},{x:61,y:78},{x:62,y:76},{x:65,y:78},{x:65.5,y:82},{x:65.5,y:83},{x:62,y:85},{x:61.5,y:81}],
	[{x:52,y:83},{x:52,y:79},{x:53,y:77},{x:57,y:79},{x:57.5,y:84},{x:57,y:88},{x:55,y:87.5},{x:54.5,y:84},{x:55,y:81}],
	[{x:47,y:81.5},{x:47.5,y:79},{x:47.5,y:76},{x:50,y:76},{x:52,y:72},{x:53.5,y:74},{x:53,y:77},{x:52,y:79},{x:52,y:80},{x:49,y:81.5},{x:51,y:77.5}],
	[{x:47,y:94.5},{x:47.5,y:92},{x:47,y:88.5},{x:47.5,y:87},{x:47,y:85.5},{x:47,y:81.5},{x:49,y:81.5},{x:50,y:88},{x:50.5,y:94.5},{x:49,y:94},{x:48.5,y:88}],
	[{x:50,y:88},{x:49,y:81.5},{x:52,y:80},{x:52,y:83},{x:54.5,y:84},{x:55,y:87.5},{x:55,y:89.5},{x:53,y:90},{x:52,y:87},{x:52,y:85}],
	[{x:50.5,y:94.5},{x:50,y:88},{x:52,y:87},{x:53,y:90},{x:55,y:89.5},{x:55,y:87.5},{x:57,y:88},{x:56.5,y:95},{x:54.5,y:93.5},{x:52.5,y:93.5},{x:53.5,y:91.5}],
	[{x:56.5,y:95},{x:57,y:88},{x:57.5,y:84},{x:62,y:85},{x:62,y:87},{x:64.5,y:88},{x:65,y:92},{x:62,y:95},{x:60.5,y:90}],
	[{x:62,y:87},{x:62,y:85},{x:65.5,y:83},{x:69,y:84.5},{x:69,y:86},{x:68,y:87},{x:67,y:93.5},{x:65.5,y:93.5},{x:65,y:92},{x:64.5,y:88},{x:66,y:87}],
	[{x:63,y:94},{x:65,y:92},{x:65.5,y:93.5},{x:68,y:93.5},{x:69.5,y:89},{x:72.5,y:86.5},{x:73,y:93},{x:73,y:94.5},{x:70.5,y:96},{x:65,y:95.5},{x:71,y:92}],
	[{x:73,y:94.5},{x:73,y:93},{x:72.5,y:86.5},{x:75.5,y:86.5},{x:75,y:89},{x:75.5,y:90},{x:81,y:90},{x:81.5,y:95.5},{x:78,y:97},{x:75,y:96.5},{x:77,y:93}],
	//end of naval 120's
	[{x:81.5,y:95.5},{x:81,y:90},{x:85,y:84.5},{x:88,y:88.5},{x:88.5,y:94},{x:87,y:96},{x:84.5,y:94.5},{x:85,y:90.5}],
	[{x:85,y:84.5},{x:85,y:83},{x:84.5,y:82},{x:84,y:79.5},{x:85,y:76.5},{x:88,y:74.5},{x:88.5,y:79},{x:91,y:80},{x:90.5,y:86},{x:88,y:88.5},{x:87.5,y:82}],
	[{x:84,y:79.5},{x:82,y:78},{x:81.5,y:75.5},{x:80,y:75},{x:80,y:70},{x:81,y:70},{x:84,y:68},{x:87.5,y:69},{x:87.5,y:71},{x:88,y:74.5},{x:85,y:76.5},{x:84,y:73}],
	[{x:88,y:74.5},{x:87.5,y:71},{x:87.5,y:69},{x:91,y:68},{x:91,y:63},{x:95,y:61},{x:96,y:67},{x:95,y:73},{x:93,y:68}],
	[{x:88.5,y:79},{x:88,y:74.5},{x:95,y:73},{x:94.5,y:79.5},{x:91,y:80},{x:91.5,y:76.5}],
	[{x:88.5,y:94},{x:88,y:88.5},{x:90.5,y:86},{x:91,y:80},{x:94.5,y:79.5},{x:94,y:87},{x:92.5,y:91.5},{x:92,y:87}],
	[{x:92.5,y:91.5},{x:94,y:87},{x:94.5,y:79.5},{x:95,y:73},{x:95.5,y:70},{x:97.5,y:73.5},{x:98,y:82},{x:97,y:92},{x:94.5,y:94},{x:96,y:82}],
];
//var territoryIndex = [];

//type: 0=land, 1=sea
var territoryStateInfo = [];
for (var i = 0; i <= 7; i++) {
	territoryStateInfo.push({type:0,capital:false,ownedByPlayer:-1,occupiedByPlayer:-1,occupiedByUnits:[],naturalHazardIDs:[],speedSpent:99,pathToTer:[]})
}
for (var i = 8; i <= 14; i++) {
	territoryStateInfo.push({type:0,capital:false,ownedByPlayer:playerByKingdom[2],occupiedByPlayer:-1,occupiedByUnits:[],naturalHazardIDs:[],speedSpent:99,pathToTer:[]})
}
territoryStateInfo[10].capital = true;
territoryStateInfo[10].occupiedByPlayer = playerByKingdom[2];
for (var i = 15; i <= 24; i++) {
	territoryStateInfo.push({type:0,capital:false,ownedByPlayer:playerByKingdom[3],occupiedByPlayer:-1,occupiedByUnits:[],naturalHazardIDs:[],speedSpent:99,pathToTer:[]})
}
territoryStateInfo[18].capital = true;
territoryStateInfo[18].occupiedByPlayer = playerByKingdom[3];
for (var i = 25; i <= 30; i++) {
	territoryStateInfo.push({type:0,capital:false,ownedByPlayer:playerByKingdom[0],occupiedByPlayer:-1,occupiedByUnits:[],naturalHazardIDs:[],speedSpent:99,pathToTer:[]})
}
territoryStateInfo[29].capital = true;
territoryStateInfo[29].occupiedByPlayer = playerByKingdom[0];
for (var i = 31; i <= 37; i++) {
	territoryStateInfo.push({type:0,capital:false,ownedByPlayer:playerByKingdom[1],occupiedByPlayer:-1,occupiedByUnits:[],naturalHazardIDs:[],speedSpent:99,pathToTer:[]})
}
territoryStateInfo[35].capital = true;
territoryStateInfo[35].occupiedByPlayer = playerByKingdom[1];
for (var i = 38; i <= 41; i++) {
	territoryStateInfo.push({type:0,capital:false,ownedByPlayer:-1,occupiedByPlayer:-1,occupiedByUnits:[],naturalHazardIDs:[],speedSpent:99,pathToTer:[]})
}
for (var i = 42; i <= 137; i++) {
	territoryStateInfo.push({type:1,capital:false,ownedByPlayer:-1,occupiedByPlayer:-1,occupiedByUnits:[],naturalHazardIDs:[],speedSpent:99,pathToTer:[]})
}
//adjacent territories
	territoryStateInfo[0].adjacentTer = [1,42,60,61,62];
	territoryStateInfo[1].adjacentTer = [0,3,4,5,42,54,60];
	territoryStateInfo[2].adjacentTer = [3,42,43,44,45,51,52];
	territoryStateInfo[3].adjacentTer = [1,2,52,54];
	territoryStateInfo[4].adjacentTer = [1,6,53,54,55];
	territoryStateInfo[5].adjacentTer = [1,6,7,59,60];
	territoryStateInfo[6].adjacentTer = [4,5,55,56,57];
	territoryStateInfo[7].adjacentTer = [5,57,58,59];
	territoryStateInfo[8].adjacentTer = [9,10,59,61,65,69];
	territoryStateInfo[9].adjacentTer = [8,10,12,58,59];
	territoryStateInfo[10].adjacentTer = [8,9,11,12,69,70];
	territoryStateInfo[11].adjacentTer = [10,12,73,75,77,79];
	territoryStateInfo[12].adjacentTer = [9,10,11,13,14,58,79];
	territoryStateInfo[13].adjacentTer = [12,14,15,58];
	territoryStateInfo[14].adjacentTer = [12,13,15,79,80];
	territoryStateInfo[15].adjacentTer = [13,14,16,17,57,58,80,81];
	territoryStateInfo[16].adjacentTer = [15,17,18,56,57];
	territoryStateInfo[17].adjacentTer = [15,16,18,19,81,86,87];
	territoryStateInfo[18].adjacentTer = [16,17,19,20,21,55,56];
	territoryStateInfo[19].adjacentTer = [17,18,21,87,89];
	territoryStateInfo[20].adjacentTer = [18,21,55];
	territoryStateInfo[21].adjacentTer = [18,19,20,92];
	territoryStateInfo[22].adjacentTer = [50,53,92];
	territoryStateInfo[23].adjacentTer = [80,81,82];
	territoryStateInfo[24].adjacentTer = [84,85,123];
	territoryStateInfo[25].adjacentTer = [26,28,29,30,45,46];
	territoryStateInfo[26].adjacentTer = [25,27,30,46,47];
	territoryStateInfo[27].adjacentTer = [26,30,47,48,49];
	territoryStateInfo[28].adjacentTer = [25,29,45,51,52,53];
	territoryStateInfo[29].adjacentTer = [25,28,30,50,53];
	territoryStateInfo[30].adjacentTer = [25,26,27,29,49,50];
	territoryStateInfo[31].adjacentTer = [32,88,119,120,121,122];
	territoryStateInfo[32].adjacentTer = [31,33,35,88,89,90,91];
	territoryStateInfo[33].adjacentTer = [32,34,90,91,93,94,95];
	territoryStateInfo[34].adjacentTer = [33,35,90,95,96,97,105,107];
	territoryStateInfo[35].adjacentTer = [32,34,36,37,90,107,119];
	territoryStateInfo[36].adjacentTer = [35,37,115,117,118,119];
	territoryStateInfo[37].adjacentTer = [35,36,107,109,112,114,115];
	territoryStateInfo[38].adjacentTer = [39,117,118,120,127,128];
	territoryStateInfo[39].adjacentTer = [38,40,41,116,117,129];
	territoryStateInfo[40].adjacentTer = [39,41,116,131,132];
	territoryStateInfo[41].adjacentTer = [39,40,129,130,131];
	territoryStateInfo[42].adjacentTer = [0,1,2,43,62];
	territoryStateInfo[43].adjacentTer = [2,42,44,62];
	territoryStateInfo[44].adjacentTer = [2,43,45];
	territoryStateInfo[45].adjacentTer = [2,25,28,44,46,51];
	territoryStateInfo[46].adjacentTer = [25,26,45,47];
	territoryStateInfo[47].adjacentTer = [26,27,46,48,99];
	territoryStateInfo[48].adjacentTer = [27,47,49,94,96,98,99];
	territoryStateInfo[49].adjacentTer = [27,30,48,50,93,94];
	territoryStateInfo[50].adjacentTer = [22,29,30,49,53,92,93];
	territoryStateInfo[51].adjacentTer = [2,28,45,52];
	territoryStateInfo[52].adjacentTer = [2,3,28,51,53,54];
	territoryStateInfo[53].adjacentTer = [4,22,28,29,50,52,54];
	territoryStateInfo[54].adjacentTer = [1,3,4,52,53];
	territoryStateInfo[55].adjacentTer = [4,6,18,20];
	territoryStateInfo[56].adjacentTer = [6,16,18,55,57];
	territoryStateInfo[57].adjacentTer = [6,7,15,16,56,58];
	territoryStateInfo[58].adjacentTer = [7,9,12,13,15,57,59];
	territoryStateInfo[59].adjacentTer = [5,7,8,9,58,60,61];
	territoryStateInfo[60].adjacentTer = [0,1,5,59,61];
	territoryStateInfo[61].adjacentTer = [0,8,59,60,62,64,65];
	territoryStateInfo[62].adjacentTer = [0,42,43,61,63,64];
	territoryStateInfo[63].adjacentTer = [62,64,66];
	territoryStateInfo[64].adjacentTer = [61,62,63,65,66];
	territoryStateInfo[65].adjacentTer = [8,61,64,66,67,68,69];
	territoryStateInfo[66].adjacentTer = [63,64,65,67];
	territoryStateInfo[67].adjacentTer = [65,66,68];
	territoryStateInfo[68].adjacentTer = [65,67,69,70,71];
	territoryStateInfo[69].adjacentTer = [8,10,65,68,70];
	territoryStateInfo[70].adjacentTer = [10,68,69,71,72,73];
	territoryStateInfo[71].adjacentTer = [68,70,72];
	territoryStateInfo[72].adjacentTer = [70,71,73,74];
	territoryStateInfo[73].adjacentTer = [11,70,72,74,75];
	territoryStateInfo[74].adjacentTer = [72,73,75];
	territoryStateInfo[75].adjacentTer = [11,73,74,76,77];
	territoryStateInfo[76].adjacentTer = [75,78];
	territoryStateInfo[77].adjacentTer = [11,75,78,80];
	territoryStateInfo[78].adjacentTer = [76,77,80,83];
	territoryStateInfo[79].adjacentTer = [11,12,14,80];
	territoryStateInfo[80].adjacentTer = [14,15,23,77,78,79,81,82,83];
	territoryStateInfo[81].adjacentTer = [15,17,23,80,82,86];
	territoryStateInfo[82].adjacentTer = [23,80,81,83,84,86];
	territoryStateInfo[83].adjacentTer = [78,80,82,84,85];
	territoryStateInfo[84].adjacentTer = [24,82,83,85,86,123];
	territoryStateInfo[85].adjacentTer = [24,83,84,123];
	territoryStateInfo[86].adjacentTer = [17,81,82,84,87,122];
	territoryStateInfo[87].adjacentTer = [17,19,86,88,89,122];
	territoryStateInfo[88].adjacentTer = [31,32,87,89,122];
	territoryStateInfo[89].adjacentTer = [19,32,87,88,91];
	territoryStateInfo[90].adjacentTer = [32,33,34,35,107,119];
	territoryStateInfo[91].adjacentTer = [32,33,89,92,93];
	territoryStateInfo[92].adjacentTer = [21,22,50,91,93];
	territoryStateInfo[93].adjacentTer = [33,49,50,91,92,94];
	territoryStateInfo[94].adjacentTer = [33,48,49,93,95,96];
	territoryStateInfo[95].adjacentTer = [33,34,94,96];
	territoryStateInfo[96].adjacentTer = [34,48,94,95,97,98];
	territoryStateInfo[97].adjacentTer = [34,96,98,100,101,105];
	territoryStateInfo[98].adjacentTer = [48,96,97,99,100];
	territoryStateInfo[99].adjacentTer = [47,48,98,100];
	territoryStateInfo[100].adjacentTer = [97,98,99,101];
	territoryStateInfo[101].adjacentTer = [97,100,102,103,104,105];
	territoryStateInfo[102].adjacentTer = [101,103];
	territoryStateInfo[103].adjacentTer = [101,102,104,111];
	territoryStateInfo[104].adjacentTer = [101,103,105,106,110,111];
	territoryStateInfo[105].adjacentTer = [34,97,101,104,106,107];
	territoryStateInfo[106].adjacentTer = [104,105,107,108,110];
	territoryStateInfo[107].adjacentTer = [34,35,37,105,106,108,109];
	territoryStateInfo[108].adjacentTer = [106,107,109,110];
	territoryStateInfo[109].adjacentTer = [37,107,108,110,112];
	territoryStateInfo[110].adjacentTer = [104,106,108,109,111,112];
	territoryStateInfo[111].adjacentTer = [103,104,110,112,113];
	territoryStateInfo[112].adjacentTer = [37,109,110,111,113,114];
	territoryStateInfo[113].adjacentTer = [111,112,114,133];
	territoryStateInfo[114].adjacentTer = [37,112,113,115,132,133];
	territoryStateInfo[115].adjacentTer = [36,37,114,116,117,132];
	territoryStateInfo[116].adjacentTer = [39,40,115,117,132];
	territoryStateInfo[117].adjacentTer = [36,38,39,116,118];
	territoryStateInfo[118].adjacentTer = [36,38,117,119,120];
	territoryStateInfo[119].adjacentTer = [31,35,36,118,120];
	territoryStateInfo[120].adjacentTer = [31,38,118,119,121,126,127];
	territoryStateInfo[121].adjacentTer = [31,120,122,124,125,126];
	territoryStateInfo[122].adjacentTer = [31,86,87,88,121,123,124];
	territoryStateInfo[123].adjacentTer = [24,84,85,122,124,125];
	territoryStateInfo[124].adjacentTer = [121,122,123,125];
	territoryStateInfo[125].adjacentTer = [121,123,124,126];
	territoryStateInfo[126].adjacentTer = [120,121,125,127,128];
	territoryStateInfo[127].adjacentTer = [38,120,126,128];
	territoryStateInfo[128].adjacentTer = [38,126,127,129];
	territoryStateInfo[129].adjacentTer = [39,41,128,130];
	territoryStateInfo[130].adjacentTer = [41,129,131,135];
	territoryStateInfo[131].adjacentTer = [40,41,130,132,134,135];
	territoryStateInfo[132].adjacentTer = [40,114,115,116,131];
	territoryStateInfo[133].adjacentTer = [113,114,132,134,136];
	territoryStateInfo[134].adjacentTer = [131,132,133,135,136];
	territoryStateInfo[135].adjacentTer = [130,131,134,136];
	territoryStateInfo[136].adjacentTer = [133,134,135];

//cardType: 0=unit, 1=trap, 2=utility
//affiliation: 0=none, 1=mantle, 2=mistral, 3=vacuo, 4=vale
//(transport)size: 0=normal, 1=large, 2=huge, 3=colossal, 99=immovable (structure)
//type: 0=ground, 1=naval, 2=flying, 3=structure(ground), 4=structure(naval), 5=ground/naval
//mechanical: 0=non-mechanical, 1=half-mechanical, 2=full-mechanical
//duration: 0=player turn, 1+=n rounds, 999=permanent
//natural hazards: vsGround=vs ground, vsNaval=vs naval, vsAir=vs flying
var cardInfo = [
	//unit cards
	{name:'Artificial Trunami Generator',cardType:0,frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:0,size:99,type:4,mechanical:2,currentHP:1,maxHP:20,attack:25,speed:0,trainingTime:8,image:unitImage},
	{name:'Atlesian Air Fleet',cardType:0,frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:1,size:1,type:2,mechanical:2,currentHP:1,maxHP:25,attack:40,speed:2,trainingTime:11,image:unitImage},
	{name:'Atlesian Bomb Drones',cardType:0,frequency1:0,frequency2:0,frequency3:uncommon,affiliation:1,size:0,type:0,mechanical:2,currentHP:1,maxHP:15,attack:50,speed:1,trainingTime:6,image:unitImage},
	{name:'Atlesian Dreadnaught',cardType:0,frequency1:0,frequency2:0,frequency3:uncommon,affiliation:1,size:2,type:1,mechanical:2,currentHP:1,maxHP:40,attack:40,speed:2,trainingTime:12,image:unitImage},
	{name:'Atlesian Knights',cardType:0,frequency1:common,frequency2:rare,frequency3:0,affiliation:3,size:0,type:0,mechanical:0,currentHP:1,maxHP:15,attack:15,speed:1,trainingTime:1,image:unitImage},
	{name:'Cannonneers',cardType:0,frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:0,size:0,type:0,mechanical:0,currentHP:1,maxHP:20,attack:25,speed:1,trainingTime:7,image:unitImage},
	{name:'Conscript',cardType:0,frequency1:common,frequency2:uncommon,frequency3:0,affiliation:0,size:0,type:0,mechanical:0,currentHP:1,maxHP:10,attack:15,speed:1,trainingTime:0,image:unitImage},
	{name:'Faunus Slave-soldiers',cardType:0,frequency1:uncommon,frequency2:uncommon,frequency3:0,affiliation:0,size:0,type:0,mechanical:0,currentHP:1,maxHP:10,attack:15,speed:1,trainingTime:0,image:unitImage},
	{name:'Giant Armor',cardType:0,frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:0,size:1,type:2,mechanical:0,currentHP:1,maxHP:25,attack:40,speed:3,trainingTime:6,image:unitImage},
	{name:'Guardian Angel',cardType:0,frequency1:0,frequency2:0,frequency3:rare,affiliation:0,size:2,type:2,mechanical:2,currentHP:1,maxHP:50,attack:40,speed:1,trainingTime:16,image:unitImage},
	{name:'Highwind Surfers',cardType:0,frequency1:common,frequency2:uncommon,frequency3:0,affiliation:0,size:0,type:1,mechanical:1,currentHP:1,maxHP:15,attack:15,speed:2,trainingTime:3,image:unitImage},
	{name:'Imahim\'s Aerial Gunship',cardType:0,frequency1:0,frequency2:uncommon,frequency3:uncommon,affiliation:0,size:0,type:2,mechanical:2,currentHP:1,maxHP:25,attack:25,speed:3,trainingTime:9,image:unitImage},
	{name:'Iron Whale',cardType:0,frequency1:0,frequency2:uncommon,frequency3:common,affiliation:0,size:1,type:1,mechanical:2,currentHP:1,maxHP:25,attack:25,speed:2,trainingTime:7,image:unitImage},
	{name:'Knights of the Golden Sparrow',cardType:0,frequency1:rare,frequency2:uncommon,frequency3:0,affiliation:0,size:0,type:0,mechanical:0,currentHP:1,maxHP:25,attack:25,speed:1,trainingTime:3,image:unitImage},
	{name:'Large Transport Ship',cardType:0,frequency1:0,frequency2:uncommon,frequency3:common,affiliation:0,size:2,type:1,mechanical:2,currentHP:1,maxHP:35,attack:0,speed:3,trainingTime:7,transportNumber:6,transportSize:1,image:unitImage},
	{name:'Mistral Elemental Titan',cardType:0,frequency1:0,frequency2:0,frequency3:uncommon,affiliation:2,size:2,type:0,mechanical:0,currentHP:1,maxHP:40,attack:40,speed:1,trainingTime:12,image:unitImage},
	{name:'Mistral Gliders',cardType:0,frequency1:uncommon,frequency2:rare,frequency3:0,affiliation:2,size:0,type:5,mechanical:1,currentHP:1,maxHP:15,attack:15,speed:2,trainingTime:6,image:unitImage},
	{name:'Mistral Golems',cardType:0,frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:2,size:1,type:0,mechanical:2,currentHP:1,maxHP:25,attack:25,speed:2,trainingTime:8,image:unitImage},
	{name:'Mistral Ironclad Warships',cardType:0,frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:2,size:1,type:1,mechanical:2,currentHP:1,maxHP:25,attack:35,speed:3,trainingTime:8,image:unitImage},
	{name:'Orbine\'s Buccaneers',cardType:0,frequency1:rare,frequency2:common,frequency3:0,affiliation:0,size:1,type:1,mechanical:2,currentHP:1,maxHP:20,attack:20,speed:4,trainingTime:5,image:unitImage},
	{name:'Paradroppers',cardType:0,frequency1:0,frequency2:0,frequency3:common,affiliation:0,size:1,type:2,mechanical:2,currentHP:1,maxHP:40,attack:0,speed:2,trainingTime:12,transportNumber:4,transportSize:0,image:unitImage},
	{name:'Reckless Dustbombers',cardType:0,frequency1:0,frequency2:9,frequency3:0,affiliation:0,size:0,type:0,mechanical:0,currentHP:1,maxHP:15,attack:25,speed:1,trainingTime:4,image:unitImage},
	{name:'Transport Ships',cardType:0,frequency1:uncommon,frequency2:uncommon,frequency3:0,affiliation:0,size:1,type:1,mechanical:2,currentHP:1,maxHP:15,attack:0,speed:3,trainingTime:4,transportNumber:2,transportSize:0,image:unitImage},
	{name:'Unstable Dust Ships',cardType:0,frequency1:rare,frequency2:common,frequency3:rare,affiliation:0,size:0,type:1,mechanical:2,currentHP:1,maxHP:15,attack:50,speed:3,trainingTime:4,image:unitImage},
	{name:'Vacual Beast Tamers',cardType:0,frequency1:0,frequency2:uncommon,frequency3:0,affiliation:3,size:1,type:0,mechanical:0,currentHP:1,maxHP:25,attack:25,speed:2,trainingTime:4,image:unitImage},
	{name:'Vacual Dunesailers',cardType:0,frequency1:rare,frequency2:uncommon,frequency3:0,affiliation:3,size:1,type:0,mechanical:2,currentHP:1,maxHP:15,attack:0,speed:3,trainingTime:4,transportNumber:2,transportSize:0,image:unitImage},
	{name:'Vacual Valkyries',cardType:0,frequency1:0,frequency2:0,frequency3:uncommon,affiliation:3,size:1,type:2,mechanical:0,currentHP:1,maxHP:25,attack:40,speed:3,trainingTime:6,image:unitImage},
	{name:'Vacual Wolfriders',cardType:0,frequency1:common,frequency2:uncommon,frequency3:0,affiliation:3,size:0,type:0,mechanical:0,currentHP:1,maxHP:15,attack:20,speed:3,trainingTime:4,image:unitImage},
	{name:'Valer Air Balloons',cardType:0,frequency1:uncommon,frequency2:uncommon,frequency3:0,affiliation:4,size:0,type:2,mechanical:2,currentHP:1,maxHP:15,attack:15,speed:1,trainingTime:8,image:unitImage},
	{name:'Valer Musketeers',cardType:0,frequency1:rare,frequency2:uncommon,frequency3:0,affiliation:4,size:0,type:0,mechanical:0,currentHP:1,maxHP:15,attack:20,speed:1,trainingTime:2,image:unitImage},
	{name:'Valer Sapphire Eye Marines',cardType:0,frequency1:0,frequency2:0,frequency3:common,affiliation:4,size:1,type:1,mechanical:2,currentHP:1,maxHP:30,attack:25,speed:3,trainingTime:8,image:unitImage},
	{name:'Valer Sniper Squad',cardType:0,frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:4,size:0,type:0,mechanical:0,currentHP:1,maxHP:25,attack:40,speed:1,trainingTime:4,image:unitImage},
	{name:'Wall',cardType:0,frequency1:common,frequency2:uncommon,frequency3:0,affiliation:0,size:99,type:3,mechanical:2,currentHP:1,maxHP:15,attack:0,speed:0,trainingTime:4,image:unitImage},
	{name:'Watch Tower',cardType:0,frequency1:uncommon,frequency2:common,frequency3:0,affiliation:0,size:99,type:3,mechanical:2,currentHP:1,maxHP:15,attack:15,speed:0,trainingTime:4,image:unitImage},
	{name:'Zeppelin Bombers',cardType:0,frequency1:0,frequency2:0,frequency3:rare,affiliation:0,size:1,type:2,mechanical:2,currentHP:1,maxHP:25,attack:30,speed:1,trainingTime:12,image:unitImage},
	//trap cards
	{name:'Abanea Trenchdiggers',cardType:1,frequency1:uncommon,frequency2:uncommon,frequency3:0,affiliation:0,image:trapImage,description:''},
	{name:'Dismantler',cardType:1,frequency1:rare,frequency2:rare,frequency3:rare,affiliation:0,image:trapImage,description:''},
	{name:'Elemental Destabilizer',cardType:1,frequency1:0,frequency2:rare,frequency3:rare,affiliation:0,image:trapImage,description:''},
	{name:'Forged Armistice',cardType:1,frequency1:rare,frequency2:rare,frequency3:rare,affiliation:0,image:trapImage,description:''},
	{name:'Frost Dust Bombs',cardType:1,frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:0,image:trapImage,description:''},
	{name:'Giant Nevermore',cardType:1,frequency1:0,frequency2:rare,frequency3:rare,affiliation:0,image:trapImage,description:''},
	{name:'Grimm Attack',cardType:1,frequency1:common,frequency2:common,frequency3:uncommon,affiliation:0,image:trapImage,description:''},
	{name:'Liquid Death',cardType:1,frequency1:0,frequency2:uncommon,frequency3:uncommon,affiliation:0,image:trapImage,description:''},
	{name:'Minefield',cardType:1,frequency1:rare,frequency2:uncommon,frequency3:0,affiliation:0,image:trapImage,description:''},
	{name:'Naval Minefield',cardType:1,frequency1:rare,frequency2:uncommon,frequency3:0,affiliation:0,image:trapImage,description:''},
	{name:'Royal Reinstatement',cardType:1,frequency1:uncommon,frequency2:uncommon,frequency3:uncommon,affiliation:0,image:trapImage,description:''},
	{name:'Rusting Mists',cardType:1,frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:0,image:trapImage,description:''},
	{name:'Stealthy Commandeering',cardType:1,frequency1:0,frequency2:rare,frequency3:rare,affiliation:0,image:trapImage,description:''},
	{name:'Trapping Pit',cardType:1,frequency1:common,frequency2:uncommon,frequency3:0,affiliation:0,image:trapImage,description:''},
	//utility cards
	{name:'Amethyst Grove Saboteur',cardType:2,frequency1:rare,frequency2:rare,frequency3:rare,affiliation:0,duration:0,image:utilityImage,description:''},
	{name:'Atlesian Engineers',cardType:2,frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:1,duration:1,image:utilityImage,description:''},
	{name:'Concentrated Dust',cardType:2,frequency1:0,frequency2:uncommon,frequency3:uncommon,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Desert Scavenge',cardType:2,frequency1:0,frequency2:rare,frequency3:0,affiliation:0,duration:0,image:utilityImage,description:''},
	{name:'Earthquake',cardType:2,frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:0,vsGround:1,vsNaval:0,vsAir:0,duration:3,image:utilityImage,description:''},
	{name:'First Aid',cardType:2,frequency1:uncommon,frequency2:uncommon,frequency3:rare,affiliation:0,duration:0,image:utilityImage,description:''},
	{name:'Infused Armor',cardType:2,frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Lightning Storm',cardType:2,frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:0,vsGround:0,vsNaval:0,vsAir:1,duration:3,image:utilityImage,description:''},
	{name:'Maelstrom',cardType:2,frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:0,vsGround:0,vsNaval:1,vsAir:0,duration:3,image:utilityImage,description:''},
	{name:'Mistral Trade Route',cardType:2,frequency1:rare,frequency2:rare,frequency3:rare,affiliation:2,duration:0,image:utilityImage,description:''},
	{name:'Naval Ram',cardType:2,frequency1:common,frequency2:uncommon,frequency3:0,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Perimeter Defenses',cardType:2,frequency1:uncommon,frequency2:uncommon,frequency3:0,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Prototype Weaponry',cardType:2,frequency1:rare,frequency2:rare,frequency3:rare,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Reinforce Structure',cardType:2,frequency1:common,frequency2:uncommon,frequency3:rare,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Resourceful Raider',cardType:2,frequency1:0,frequency2:rare,frequency3:rare,affiliation:0,duration:0,image:utilityImage,description:''},
	{name:'Sandstorm',cardType:2,frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:0,vsGround:1,vsNaval:0,vsAir:1,duration:3,image:utilityImage,description:''},
	{name:'Schnee Dust Company',cardType:2,frequency1:0,frequency2:0,frequency3:1,affiliation:1,duration:999,image:utilityImage,description:''},
	{name:'Silver Eyes',cardType:2,frequency1:0,frequency2:0,frequency3:1,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Smugglers of Wind Path',cardType:2,frequency1:uncommon,frequency2:uncommon,frequency3:uncommon,affiliation:0,duration:0,image:utilityImage,description:''},
	{name:'Thruster Packs',cardType:2,frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Tornado',cardType:2,frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:0,vsGround:1,vsNaval:1,vsAir:1,duration:3,image:utilityImage,description:''}
];

$(document).ready(function () {
	document.getElementById('overlay').style.backgroundColor = 'rgba(0,0,0,0)';
	var GRID = 'rtgLG';
	var UID = 'rtgUID';
	var gameStarted = false;
	var referenceCards = [];
	//determine how to use this to add statuses to each card
	var cardState = [];
	var stageOfWar = 0;
	var pCards = [];
	var drawPile = [];
	//only own cards and all active/discard piles are locally stored. The rest is for structure only
	var altCardPiles = [[/*drawpile*/], [/*p1*/], [], [], [/*p2*/], [], [], [/*p3*/], [], [], [/*p4*/], [], []];
	var activeCard = -1;
	var activeTer = -1;
	var activeUnits = [];

    //create deck
    //referenceCards contains all unique cards with info and id for reference
    //drawPile contains all drawable cards by reference id
    var count = 0;
    for (var cType = 0; cType < cardInfo.length; cType++) {
        for (var freq = 0; freq < cardInfo[cType].frequency1; freq++) {
            var card = JSON.parse(JSON.stringify(cardInfo[cType]));
            card.id = count++;
            card.stage = 1;
            referenceCards.push(card);
        }
        for (var freq = 0; freq < cardInfo[cType].frequency2; freq++) {
            var card = JSON.parse(JSON.stringify(cardInfo[cType]));
            card.id = count++;
            card.stage = 2;
            referenceCards.push(card);
        }
        for (var freq = 0; freq < cardInfo[cType].frequency3; freq++) {
            var card = JSON.parse(JSON.stringify(cardInfo[cType]));
            card.id = count++;
            card.stage = 3;
            referenceCards.push(card);
        }
    }
	//console.log(referenceCards);
    for (var i = 0; i < referenceCards.length; i++) {
        if (referenceCards[i].stage === 1) {
            drawPile.push(referenceCards[i].id);
        }
    }
	function deckShuffle(array) {
		var m = array.length, t, i;
		while (m) {
			i = Math.floor(Math.random() * m--);
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}
		drawPile = array;
	}
	deckShuffle(drawPile);
	//console.log(drawPile);

	//deal cards
	for (var cards = 0; cards < 5; cards++) {
		altCardPiles[((playerNumber * 3) + 1)].push(drawPile[cards]);
	}

	//create 3 divs, 1 for each player in order after the client's player's turn
	var tempPlayerNumber = 0;
	for (var pos = 1; pos < 4; pos++) {
		tempPlayerNumber = (playerNumber + pos);
		if (tempPlayerNumber > 3) {
			tempPlayerNumber = 0;
		}
		document.getElementById('p' + pos + 'Area').innerHTML = '<div><img src="' + kingdomPicArray[kingdom[tempPlayerNumber]] + '" width="40%"><BR>' + commName[tempPlayerNumber] + '<div id="player' + tempPlayerNumber + 'Cards" class="nOfCards">' + nOfCards[tempPlayerNumber] + '</div></div>';
	}

	//just temporary
	for (var cards = 0; cards < altCardPiles[((playerNumber * 3) + 1)].length; cards++) {
		document.getElementsByClassName('cardImage')[cards].innerHTML = altCardPiles[((playerNumber * 3) + 1)][cards] + '. ' + referenceCards[altCardPiles[((playerNumber * 3) + 1)][cards]].name;
	}

	nOfCards[4] = drawPile.length;
	var stageOfWar = 1;
	//initial draw pile, discard pile, and card magnification area
	document.getElementById('drawPile').innerHTML = '<div style="font-size: 2em">' + nOfCards[4] + '</div><BR><div style="font-size: 1.2em">(Stage ' + stageOfWar + ')</div>';

	//initial player info
	document.getElementById('kingdomImage').innerHTML = '<img src="' + kingdomPicArray[kingdom[playerNumber]] + '" height="' + (document.getElementById('playerCards').offsetHeight/100*75) + '">';
	document.getElementById('commanderName').innerHTML = commName[playerNumber];
	/*document.getElementsByClassName('cardImage')[0].innerHTML = '<img src="images/card_back_placeholder.png" height="' + (document.getElementById('playerCards').offsetHeight/100*90) + '">';
	document.getElementsByClassName('cardOptions')[0].innerHTML = 'TEXT!';*/

	//initializing territory/border shapes and positions
	/*var canvas = document.getElementById('gameBoardCanvas');
	canvas.width = document.getElementById('gameBoard').offsetWidth;
	canvas.height = document.getElementById('gameBoard').offsetHeight;
	function reOffset(){
		var BB = canvas.getBoundingClientRect();
		offsetX = BB.left;
		offsetY = BB.top;
	}
	var offsetX, offsetY;
	reOffset();
	window.onscroll = function(e) { reOffset(); }
	var isDown = false;
	var startX, startY;
	var highlight = -1;
	ctx = canvas.getContext('2d');
	ctx.fillStyle = 'rgba(0,0,0,0.2)';
	initialDraw();

	function draw(highlight) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var ter = 0; ter < territoryShapeInfo.length; ter++) {
			var definedTerritory = territoryShapeInfo[ter];
			define(definedTerritory);
			ctx.stroke();
			if(ter == highlight){
				ctx.fill();
			}
		}
	}
	function initialDraw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var ter = 0; ter < territoryShapeInfo.length; ter++) {
			var definedTerritory = territoryShapeInfo[ter];
			define(definedTerritory);
			ctx.stroke();
			//creating div's only initially or it will cause big hardware lag
			var div = document.createElement('div');
			document.body.appendChild(div);
			div.className = 'territoryDiv';
			div.id = 'territoryDiv' + ter;
			div.style.marginLeft = (document.getElementById('otherPlayers').offsetWidth + canvas.width/100*definedTerritory[(definedTerritory.length - 1)].x - 20) + 'px';
			div.style.marginTop = (canvas.height/100*definedTerritory[(definedTerritory.length - 1)].y - 15) + 'px';
			div.style.position = 'absolute';
			div.style.color = 'black';
			div.textContent = ter;*/
			/*if (ter > 9) {
				var div = document.createElement('div');
				document.body.appendChild(div);
				div.className = 'territoryDiv';
				div.id = 'territoryDiv' + (ter - 9);
				div.style.marginLeft = (document.getElementById('otherPlayers').offsetWidth + canvas.width/100*definedTerritory[(definedTerritory.length - 1)].x - 20) + 'px';
				div.style.marginTop = (canvas.height/100*definedTerritory[(definedTerritory.length - 1)].y - 15) + 'px';
				div.style.position = 'absolute';
				div.style.color = 'lightyellow';
				div.textContent = (ter - 9);
			}*/
			/*if(ter == highlight){
				ctx.fill();
			}
		}
	}
	function define(t){
		ctx.beginPath();
		var coordPercentage1 = canvas.width/100*t[0].x;
		var coordPercentage2 = canvas.height/100*t[0].y;
		ctx.moveTo(coordPercentage1, coordPercentage2);
		for (var coord = 1; coord < (t.length - 1); coord++) {
			coordPercentage1 = canvas.width/100*t[coord].x;
			coordPercentage2 = canvas.height/100*t[coord].y;
			ctx.lineTo(coordPercentage1, coordPercentage2);
		}
		ctx.closePath();
	}
	$("#gameBoardCanvas").mousemove(function(e) { handleMouseMove(e); });
	function handleMouseMove(e){
		e.preventDefault();
		e.stopPropagation();
		var mouseX = parseInt(e.clientX-offsetX);
		var mouseY = parseInt(e.clientY-offsetY);
		var highlight=-1;
		for(var i = 0; i < territoryShapeInfo.length; i++){
			var definedTerritory = territoryShapeInfo[i];
			define(definedTerritory);
			if(ctx.isPointInPath(mouseX,mouseY)){
				highlight = i;
			}
		}
		draw(highlight);
	}*/
	for (ter = 0; ter < territoryShapeInfo.length; ter++) {
		var tempString = '';
		for (coord = 0; coord < (territoryShapeInfo[ter].length - 1); coord++) {
			var tempX = 3840 / 100 * territoryShapeInfo[ter][coord].x
			var tempY = 2160 / 100 * territoryShapeInfo[ter][coord].y
			tempString = tempString + tempX + ',' + tempY + ' ';
		}
		//console.log(tempString);
		var polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
		polygon.setAttribute("points", tempString);
		polygon.style = 'stroke:black;stroke-width:3';
		polygon.id = 'territoryArea' + ter;
		//polygon.newClass = 'territoryArea';
		//polygon.setAttribute("class", 'territoryArea');
		//$('#territoryArea' + ter).attr("class", "oldclass");
		//console.log($('#territoryArea' + ter).className);
		document.getElementById('gameBoardSVG').appendChild(polygon);
		$('#territoryArea' + ter).addClass('territoryArea');
	}

	/*placing temporary units*/
		var tempTerID = 33;
		var tempActiveCard = 40;
		territoryStateInfo[tempTerID].occupiedByUnits.push(tempActiveCard);
		var tempX = 3840 / 100 * territoryShapeInfo[tempTerID][(territoryShapeInfo[tempTerID].length - 1)].x
		var tempY = 2160 / 100 * territoryShapeInfo[tempTerID][(territoryShapeInfo[tempTerID].length - 1)].y
		if (territoryStateInfo[tempTerID].occupiedByUnits.length === 1) {
			var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
			circle.setAttributeNS(null, "cx", tempX);
			circle.setAttributeNS(null, "cy", tempY);
			circle.setAttributeNS(null, "r", 2160 / 100 * 2);
			circle.setAttributeNS(null, "stroke", 'black');
			circle.setAttributeNS(null, "stroke-width", 3);
			circle.setAttributeNS(null, "fill", kingdomColorArray[2]);
			circle.id = 'unitCircleTer' + tempTerID;
			document.getElementById('gameBoardSVG').appendChild(circle);
			document.getElementById('unitCircleTer' + tempTerID).classList.add('territoryCircle');
			document.getElementById('unitCircleTer' + tempTerID).classList.add('territoryArea');
			var text = document.createElementNS('http://www.w3.org/2000/svg','text');
			text.setAttributeNS(null, "x", tempX);
			text.setAttributeNS(null, "y", tempY + 5);
			text.setAttributeNS(null, "font-size", '350%');
			text.setAttributeNS(null, "alignment-baseline", 'middle');
			text.setAttributeNS(null, "text-anchor", 'middle');
			text.setAttributeNS(null, "font-family", 'arial');
			text.id = 'unitNumbersTer' + tempTerID;
			document.getElementById('gameBoardSVG').appendChild(text);
			document.getElementById('unitNumbersTer' + tempTerID).classList.add('territoryText');
			document.getElementById('unitNumbersTer' + tempTerID).classList.add('territoryArea');
			territoryStateInfo[tempTerID].ownedByPlayer = 2;
			territoryStateInfo[terID].occupiedByPlayer = 2;
		}
		d3.select('#unitNumbersTer' + tempTerID).text(territoryStateInfo[tempTerID].occupiedByUnits.length.toString());
		$('#cardImage' + (altCardPiles[((2 * 3) + 1)].indexOf(tempActiveCard) + 1)).removeClass('selected');
		altCardPiles[((2 * 3) + 2)].push(tempActiveCard);
		referenceCards[tempActiveCard].trainingTime = 0;
		referenceCards[tempActiveCard].currentHP = referenceCards[tempActiveCard].maxHP;
		/*--------------------------------------------------------------*/
		var tempTerID = 34;
		var tempActiveCard = 5;
		territoryStateInfo[tempTerID].occupiedByUnits.push(tempActiveCard);
		var tempX = 3840 / 100 * territoryShapeInfo[tempTerID][(territoryShapeInfo[tempTerID].length - 1)].x
		var tempY = 2160 / 100 * territoryShapeInfo[tempTerID][(territoryShapeInfo[tempTerID].length - 1)].y
		if (territoryStateInfo[tempTerID].occupiedByUnits.length === 1) {
			var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
			circle.setAttributeNS(null, "cx", tempX);
			circle.setAttributeNS(null, "cy", tempY);
			circle.setAttributeNS(null, "r", 2160 / 100 * 2);
			circle.setAttributeNS(null, "stroke", 'black');
			circle.setAttributeNS(null, "stroke-width", 3);
			circle.setAttributeNS(null, "fill", kingdomColorArray[playerNumber]);
			circle.id = 'unitCircleTer' + tempTerID;
			document.getElementById('gameBoardSVG').appendChild(circle);
			document.getElementById('unitCircleTer' + tempTerID).classList.add('territoryCircle');
			document.getElementById('unitCircleTer' + tempTerID).classList.add('territoryArea');
			var text = document.createElementNS('http://www.w3.org/2000/svg','text');
			text.setAttributeNS(null, "x", tempX);
			text.setAttributeNS(null, "y", tempY + 5);
			text.setAttributeNS(null, "font-size", '350%');
			text.setAttributeNS(null, "alignment-baseline", 'middle');
			text.setAttributeNS(null, "text-anchor", 'middle');
			text.setAttributeNS(null, "font-family", 'arial');
			text.id = 'unitNumbersTer' + tempTerID;
			document.getElementById('gameBoardSVG').appendChild(text);
			document.getElementById('unitNumbersTer' + tempTerID).classList.add('territoryText');
			document.getElementById('unitNumbersTer' + tempTerID).classList.add('territoryArea');
			territoryStateInfo[tempTerID].ownedByPlayer = playerNumber;
			territoryStateInfo[terID].occupiedByPlayer = playerNumber;
		}
		d3.select('#unitNumbersTer' + tempTerID).text(territoryStateInfo[tempTerID].occupiedByUnits.length.toString());
		$('#cardImage' + (altCardPiles[((playerNumber * 3) + 1)].indexOf(tempActiveCard) + 1)).removeClass('selected');
		altCardPiles[((playerNumber * 3) + 2)].push(tempActiveCard);
		referenceCards[tempActiveCard].trainingTime = 0;
		referenceCards[tempActiveCard].currentHP = referenceCards[tempActiveCard].maxHP;

	/*------------------------------------------------------------------*/
	//remove var
	var playerTurn = 1;
	nOfCards[playerNumber] = 5;

	document.getElementById('endTurnButton').onclick=function(){
		//add next turn socket server-side
		//socket.emit('next turn');
		nextTurn(1);
		console.log('next turn');
	}
	//socket.on('next turn', function(sPlayerTurn) {
	function nextTurn(sPlayerTurn) {
		playerTurn = sPlayerTurn;
		changeInteractibility();
		for (var player = 0; player < 4; player++) {
			for (var actives = 0; actives < altCardPiles[((player * 3) + 2)].length; actives++) {
				console.log(referenceCards[altCardPiles[((player * 3) + 2)][actives]]);
				if (referenceCards[altCardPiles[((player * 3) + 2)][actives]].trainingTime > 0) {
					referenceCards[altCardPiles[((player * 3) + 2)][actives]].trainingTime--
				}
			}
		}
		if (activeCard !== -1) {
			$('#cardImage' + (altCardPiles[((playerNumber * 3) + 1)].indexOf(activeCard) + 1)).removeClass('selected');
			activeCard = -1;
		}
		if (playerTurn === playerNumber) {
			//change 1 to 0
			if (playerNumber === 1) {
				//socket.emit('request save game', GRID, JSON.stringify(drawPile), JSON.stringify(pCards), territoryStateInfo, stageOfWar);
			}
		}
	}
	//});

	//socket.on('save game data request', function(){
		//socket.emit('return save game data', GRID, JSON.stringify(pCards));
	//});

	function changeInteractibility() {
		if (playerTurn === playerNumber) {
			for (var ter = 0; ter < territoryShapeInfo.length; ter++) {
				$('#territoryArea' + ter).unbind('mouseenter');
				$('#territoryArea' + ter).unbind('mouseleave');
				$('#territoryArea' + ter).unbind('click');
				$('#territoryArea' + ter).hover(function(){
					$(this).toggleClass('hoveredTer');
				});
				$('#territoryArea' + ter).click(function(){
					var terID = this.id.substr(13);
					if (activeCard !== -1 && $(this).hasClass('viableTarget')) {
						placeUnit(terID);
					} else if (activeCard === -1) {
						if ($(this).hasClass('viableMovement') !== true) {
							/*if (activeTer !== -1) {
								removeRadial(terID);
							}
							createRadial(terID);*/
							showTerState(terID, this);
						} else {
							console.log('moveToTer triggered');
							//moveToTer();
						}
					}
					console.log(territoryStateInfo[terID].occupiedByUnits);
				});
			}
			for (var cards = 1; cards <= 8; cards++) {
				$('#cardImage' + cards).unbind('mouseenter');
				$('#cardImage' + cards).unbind('mouseleave');
				$('#cardImage' + cards).unbind('click');
				if (cards <= nOfCards[playerNumber]) {
					$('#cardImage' + cards).hover(function(){
						$(this).toggleClass('hoveredCard');
					});
					$('#cardImage' + cards).click(function(){
						var cardID = altCardPiles[((playerNumber * 3) + 1)][this.cellIndex - 1];
						selectCard(cardID, this);
					});
				}
			}
		} else {

		}
	}
	changeInteractibility();

	function placeUnit(terID) {
		territoryStateInfo[terID].occupiedByUnits.push(activeCard);
		var tempX = 3840 / 100 * territoryShapeInfo[terID][(territoryShapeInfo[terID].length - 1)].x
		var tempY = 2160 / 100 * territoryShapeInfo[terID][(territoryShapeInfo[terID].length - 1)].y
		if (territoryStateInfo[terID].occupiedByUnits.length === 1) {
			var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
			circle.setAttributeNS(null, "cx", tempX);
			circle.setAttributeNS(null, "cy", tempY);
			circle.setAttributeNS(null, "r", 2160 / 100 * 2);
			circle.setAttributeNS(null, "stroke", 'black');
			circle.setAttributeNS(null, "stroke-width", 3);
			circle.setAttributeNS(null, "fill", kingdomColorArray[playerNumber]);
			circle.id = 'unitCircleTer' + terID;
			document.getElementById('gameBoardSVG').appendChild(circle);
			document.getElementById('unitCircleTer' + terID).classList.add('territoryCircle');
			document.getElementById('unitCircleTer' + terID).classList.add('territoryArea');
			var text = document.createElementNS('http://www.w3.org/2000/svg','text');
			text.setAttributeNS(null, "x", tempX);
			text.setAttributeNS(null, "y", tempY + 5);
			text.setAttributeNS(null, "font-size", '350%');
			text.setAttributeNS(null, "alignment-baseline", 'middle');
			text.setAttributeNS(null, "text-anchor", 'middle');
			text.setAttributeNS(null, "font-family", 'arial');
			text.id = 'unitNumbersTer' + terID;
			document.getElementById('gameBoardSVG').appendChild(text);
			document.getElementById('unitNumbersTer' + terID).classList.add('territoryText');
			document.getElementById('unitNumbersTer' + terID).classList.add('territoryArea');
			territoryStateInfo[terID].ownedByPlayer = playerNumber;
			territoryStateInfo[terID].occupiedByPlayer = playerNumber;
		}
		d3.select('#unitNumbersTer' + terID).text(territoryStateInfo[terID].occupiedByUnits.length.toString());
		for (var ter = 0; ter < territoryStateInfo.length; ter++) {
			$('#territoryArea' + ter).removeClass('viableTarget');
		}
		$('#cardImage' + (altCardPiles[((playerNumber * 3) + 1)].indexOf(activeCard) + 1)).removeClass('selected');
		altCardPiles[((playerNumber * 3) + 2)].push(activeCard);
		activeCard = -1;
		changeInteractibility();
	}
	function selectCard(cardID, thisCard) {
		$('#territoryArea' + activeTer).removeClass('selected');
		activeTer = -1;
		document.getElementById('terGenInfo').innerHTML = '';
		document.getElementById('terUnitInfo').innerHTML = '';
		for (var ter = 0; ter < territoryStateInfo.length; ter++) {
			$('#territoryArea' + ter).removeClass('viableMovement');
		}
		if (activeCard !== cardID) {
			$('#cardImage' + (altCardPiles[((playerNumber * 3) + 1)].indexOf(activeCard) + 1)).removeClass('selected');
			activeCard = cardID;
			$(thisCard).addClass('selected');
			if (referenceCards[activeCard].cardType === 0) {
				for (var ter = 0; ter < territoryShapeInfo.length; ter++) {
					if (territoryStateInfo[ter].type === 0 && (referenceCards[activeCard].type === 0 || referenceCards[activeCard].type === 2 || referenceCards[activeCard].type === 3 || referenceCards[activeCard].type === 5) && territoryStateInfo[ter].ownedByPlayer === playerNumber && (territoryStateInfo[ter].occupiedByPlayer === playerNumber || territoryStateInfo[ter].occupiedByPlayer === -1)) {
						$('#territoryArea' + ter).addClass('viableTarget');
					}
					//naval territories are only viable if adjacent to owned land territory or occupied by naval unit
					for (var adj = 0; adj < territoryStateInfo[ter].adjacentTer.length; adj++) {
						var tempAdjID = territoryStateInfo[ter].adjacentTer[adj];
						if (territoryStateInfo[ter].type === 1 && (referenceCards[activeCard].type === 1 || referenceCards[activeCard].type === 2 || referenceCards[activeCard].type === 4 || referenceCards[activeCard].type === 5) && /*adjacent to unoccupied/friendly occupied land*/((territoryStateInfo[tempAdjID].type === 0 && territoryStateInfo[tempAdjID].ownedByPlayer === playerNumber && (territoryStateInfo[ter].occupiedByPlayer === playerNumber || territoryStateInfo[ter].occupiedByPlayer === -1)) || /*occupied by friendly*/territoryStateInfo[ter].occupiedByPlayer === playerNumber || /*adjacent to friendly occupied naval*/(territoryStateInfo[tempAdjID].type === 1 && (territoryStateInfo[ter].occupiedByPlayer === playerNumber || territoryStateInfo[ter].occupiedByPlayer === -1)))) {
							$('#territoryArea' + ter).addClass('viableTarget');
							break;
						}
					}
				}
			}
		} else {
			activeCard = -1;
			$(thisCard).removeClass('selected');
			for (var ter = 0; ter < territoryShapeInfo.length; ter++) {
				$('#territoryArea' + ter).removeClass('viableTarget');
			}
		}
		console.log(activeCard);
	}
	function createRadial(terID) {
		activeTer = terID;
		var outerDiv = document.createElement('div');
		outerDiv.id = 'outerRadial1';
		outerDiv.style.left = '0%';
		outerDiv.style.top = '-50%';
		document.getElementById('gameBoard').appendChild(outerDiv);
		$('#outerRadial1').addClass('outerRadial');
		var innerDiv = document.createElement('div');
		innerDiv.id = 'innerRadial1';
		document.getElementById('outerRadial1').appendChild(innerDiv);
		$('#innerRadial1').addClass('innerRadial');
		for (var items = 0; items < territoryStateInfo[terID].occupiedByUnits.length; items++) {
			var unitDiv = document.createElement('div');
			unitDiv.id = 'radialItem' + items;
			document.getElementById('innerRadial1').appendChild(unitDiv);
			unitDiv.innerHTML = 'vvv';
			$('#innerRadial1').addClass('radialItem');
		}
		document.getElementById('innerRadial1').classList.toggle('open');

		var units = document.querySelectorAll('.radialItem');
		for(var i = 0; i < units.length; i++) {
			units[i].style.left = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/units.length)*i*Math.PI)).toFixed(4) + "%";
			units[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/units.length)*i*Math.PI)).toFixed(4) + "%";
		}
		changeInteractibility();
		//outerDiv.remove();
	}
	function removeRadial(terID) {
		//console.log('removing radial');
		//document.getElementById('outerRadial1').remove();
		//$('#outerRadial1').remove();
	}
	function showTerState(terID, thisTer) {
		$(thisTer).toggleClass('selected');
		/*removing all selections*/
			if (activeTer !== terID) {
				$('#territoryArea' + activeTer).removeClass('selected');
				activeTer = terID;
			} else {
				activeTer = -1;
			}
			activeUnits = [];
			document.getElementById('terGenInfo').innerHTML = '';
			document.getElementById('terUnitInfo').innerHTML = '';
			for (var i = 0; i < 50; i++) {
				if (document.getElementById('terUnitTooltip' + i) !== null) {
					document.getElementById('terUnitTooltip' + i).remove();
					break;
				}
			}
			for (var ter = 0; ter < territoryStateInfo.length; ter++) {
				$('#territoryArea' + ter).removeClass('viableMovement');
			}
		if (activeTer !== -1) {
			if (territoryStateInfo[terID].naturalHazardIDs.length > 0) {
				var tr = document.createElement('tr');
				var td = document.createElement('td');
				var textNode = document.createTextNode('textNode');
				var text = 'Natural Hazards:';
				for (var item = 0; item < territoryStateInfo[terID].naturalHazardIDs.length; item++) {
					text += '<BR>' + referenceCards[territoryStateInfo[terID].naturalHazardIDs[item]].name;
				}
				textNode.nodeValue = text;
				td.appendChild(textNode);
				tr.appendChild(td);
				document.getElementById('terGenInfo').appendChild(tr);
				document.getElementById('terGenInfo').style.borderBottom = '2px solid black';
			}
			for (var item = 0; item < territoryStateInfo[terID].occupiedByUnits.length; item++) {
				var unitID = territoryStateInfo[terID].occupiedByUnits[item];
				var tr = document.createElement('tr');
				var td = document.createElement('td');
				td.id = 'terUnitInfo' + item;
				var textNode = document.createTextNode('textNode');
				textNode.nodeValue = referenceCards[unitID].name;
				td.appendChild(textNode);
				tr.appendChild(td);
				document.getElementById('terUnitInfo').appendChild(tr);
				$('#terUnitInfo' + item).hover(function() {
					//$('#terUnitTooltip' + item).toggleClass('showTooltip');
					//$('#terUnitTooltip' + item - 1).toggle();
					//console.log(item);
					$(this).toggleClass('hoveredUnit');
				});
				if (territoryStateInfo[terID].occupiedByPlayer === playerNumber) {
					$('#terUnitInfo' + item).click(function() {
						$(this).toggleClass('selected');
						if (activeUnits.indexOf(unitID) === -1) {
							activeUnits.push(unitID);
						} else {
							activeUnits.splice(activeUnits.indexOf(unitID), 1);
							if (activeUnits.length === 0) {
								for (var ter = 0; ter < territoryStateInfo.length; ter++) {
									$('#territoryArea' + ter).removeClass('viableMovement');
								}
							}
						}
						if (activeUnits.length > 0) {
							unitMoveAttack();
						}
					});
				}
				//creating tooltip
				var tooltipContainer = document.createElement('div');
				tooltipContainer.id = 'terUnitTooltip' + item;
				var tooltipTable = document.createElement('table');
				/*TR*/
					var tooltipNameTR = document.createElement('tr');
					var tooltipCardTypeTR = document.createElement('tr');
					var tooltipAffiliationTR = document.createElement('tr');
					if (referenceCards[unitID].size !== 99) {
						var tooltipSizeTR = document.createElement('tr');
					}
					var tooltipTypeTR = document.createElement('tr');
					var tooltipMechanicalTR = document.createElement('tr');
					var tooltipHPTR = document.createElement('tr');
					if (referenceCards[unitID].attack !== 0) {
						var tooltipAttackTR = document.createElement('tr');
					}
					var tooltipSpeedTR = document.createElement('tr');
					if (referenceCards[unitID].trainingTime > 0) {
						var tooltipTrainingTimeTR = document.createElement('tr');
					}
				/*TD*/
					var tooltipNameTD = document.createElement('td');
					tooltipNameTD.style.borderBottom = '2px solid white';
					var tooltipCardTypeTD = document.createElement('td');
					var tooltipAffiliationTD = document.createElement('td');
					var tooltipSizeTD = document.createElement('td');
					var tooltipTypeTD = document.createElement('td');
					var tooltipMechanicalTD = document.createElement('td');
					var tooltipHPTD = document.createElement('td');
					var tooltipAttackTD = document.createElement('td');
					var tooltipSpeedTD = document.createElement('td');
					if (referenceCards[unitID].trainingTime > 0) {
						var tooltipTrainingTimeTD = document.createElement('td');
					}
				/*TextNode*/
					var tooltipNameText = document.createTextNode('textName');
					tooltipNameText.nodeValue = referenceCards[unitID].name;
					var tooltipCardTypeText = document.createTextNode('textCardType');
					switch (referenceCards[unitID].cardType) {
						case 0: tooltipCardTypeText.nodeValue = 'Unit'; break;
						case 1: tooltipCardTypeText.nodeValue = 'Trap'; break;
						case 2: tooltipCardTypeText.nodeValue = 'Utility'; break;
					}
					var tooltipAffiliationText = document.createTextNode('textAffiliation');
					switch (referenceCards[unitID].affiliation) {
						case 0: tooltipAffiliationText.nodeValue = 'Affiliation: none'; break;
						case 1: tooltipAffiliationText.nodeValue = 'Affiliation: Mantle'; break;
						case 2: tooltipAffiliationText.nodeValue = 'Affiliation: Mistral'; break;
						case 3: tooltipAffiliationText.nodeValue = 'Affiliation: Vacuo'; break;
						case 4: tooltipAffiliationText.nodeValue = 'Affiliation: Vale'; break;
					}
					var tooltipSizeText = document.createTextNode('textSize');
					switch (referenceCards[unitID].size) {
						case 0: tooltipSizeText.nodeValue = 'Size: normal'; break;
						case 1: tooltipSizeText.nodeValue = 'Size: large'; break;
						case 2: tooltipSizeText.nodeValue = 'Size: huge'; break;
						case 3: tooltipSizeText.nodeValue = 'Size: colossal'; break;
					}
					var tooltipTypeText = document.createTextNode('textType');
					switch (referenceCards[unitID].type) {
						case 0: tooltipTypeText.nodeValue = 'Type: ground'; break;
						case 1: tooltipTypeText.nodeValue = 'Type: naval'; break;
						case 2: tooltipTypeText.nodeValue = 'Type: flying'; break;
						case 3: tooltipTypeText.nodeValue = 'Type: structure (ground)'; break;
						case 4: tooltipTypeText.nodeValue = 'Type: structure (naval)'; break;
						case 5: tooltipTypeText.nodeValue = 'Type: ground/naval'; break;
					}
					var tooltipMechanicalText = document.createTextNode('textMechanical');
					switch (referenceCards[unitID].mechanical) {
						case 0: tooltipMechanicalText.nodeValue = 'Non-mechanical'; break;
						case 1: tooltipMechanicalText.nodeValue = 'Half-mechanical'; break;
						case 2: tooltipMechanicalText.nodeValue = 'Full-mechanical'; break;
					}
					var tooltipHPText = document.createTextNode('textHP');
					//var referenceCards[unitID].currentHP = 1;
					tooltipHPText.nodeValue = 'HP: ' + referenceCards[unitID].currentHP.toString() + '/' + referenceCards[unitID].maxHP.toString();
					var tooltipAttackText = document.createTextNode('textAttack');
					tooltipAttackText.nodeValue = 'Attack: ' + referenceCards[unitID].attack.toString();
					var tooltipSpeedText = document.createTextNode('textSpeed');
					if (referenceCards[unitID].speed === 0) {
						tooltipSpeedText.nodeValue = 'Immobile';
					} else {
						tooltipSpeedText.nodeValue = 'Movement speed: ' + referenceCards[unitID].speed.toString();
					}
					if (referenceCards[unitID].trainingTime > 0) {
					var tooltipTrainingTimeText = document.createTextNode('textTrainingTime');
						tooltipTrainingTimeText.nodeValue = 'Training time remaining: ' + referenceCards[unitID].trainingTime.toString();
					}
				/*appending everything*/
					tooltipNameTD.appendChild(tooltipNameText);
					tooltipNameTR.appendChild(tooltipNameTD);
					tooltipTable.appendChild(tooltipNameTR);
					tooltipCardTypeTD.appendChild(tooltipCardTypeText);
					tooltipCardTypeTR.appendChild(tooltipCardTypeTD);
					tooltipTable.appendChild(tooltipCardTypeTR);
					tooltipAffiliationTD.appendChild(tooltipAffiliationText);
					tooltipAffiliationTR.appendChild(tooltipAffiliationTD);
					tooltipTable.appendChild(tooltipAffiliationTR);
					if (referenceCards[unitID].size !== 99) {
						tooltipSizeTD.appendChild(tooltipSizeText);
						tooltipSizeTR.appendChild(tooltipSizeTD);
						tooltipTable.appendChild(tooltipSizeTR);
					}
					tooltipTypeTD.appendChild(tooltipTypeText);
					tooltipTypeTR.appendChild(tooltipTypeTD);
					tooltipTable.appendChild(tooltipTypeTR);
					tooltipMechanicalTD.appendChild(tooltipMechanicalText);
					tooltipMechanicalTR.appendChild(tooltipMechanicalTD);
					tooltipTable.appendChild(tooltipMechanicalTR);
					tooltipHPTD.appendChild(tooltipHPText);
					tooltipHPTR.appendChild(tooltipHPTD);
					tooltipTable.appendChild(tooltipHPTR);
					if (referenceCards[unitID].attack !== 0) {
						tooltipAttackTD.appendChild(tooltipAttackText);
						tooltipAttackTR.appendChild(tooltipAttackTD);
						tooltipTable.appendChild(tooltipAttackTR);
					}
					tooltipSpeedTD.appendChild(tooltipSpeedText);
					tooltipSpeedTR.appendChild(tooltipSpeedTD);
					tooltipTable.appendChild(tooltipSpeedTR);
					if (referenceCards[unitID].trainingTime > 0) {
						tooltipTrainingTimeTD.appendChild(tooltipTrainingTimeText);
						tooltipTrainingTimeTR.appendChild(tooltipTrainingTimeTD);
						tooltipTable.appendChild(tooltipTrainingTimeTR);
					}
					tooltipContainer.appendChild(tooltipTable);
				document.getElementById('gameInfo').appendChild(tooltipContainer);
				$('#terUnitTooltip' + item).addClass('tooltip');
				//$('#terUnitTooltip' + item).hide();
				//console.log(item);
				/*$('#terUnitInfo' + item).hover(function(){
					//$('#terUnitTooltip' + item).toggleClass('showTooltip');
					$('#terUnitTooltip' + item - 1).toggle();
					console.log(item - 1);
				});*/
			}
		}
	}
	function unitMoveAttack() {
		var maxSpeed = 99;
		//movementMethod: -99=incompatible(g/n mixed), 0=ground, 1=naval, 2=flying, 3=ground/naval
		var movementMethod = 2;
		for (var unit = 0; unit < activeUnits.length; unit++) {
			if (referenceCards[activeUnits[unit]].type === 0) {
				if (movementMethod === 2 || movementMethod === 3) {
					movementMethod = 0;
				} else if (movementMethod === 1) {
					movementMethod = -99;
					break;
				}
			} else if (referenceCards[activeUnits[unit]].type === 1) {
				if (movementMethod === 2 || movementMethod === 3) {
					movementMethod = 1;
				} else if (movementMethod === 0) {
					movementMethod = -99;
					break;
				}
			} else if (referenceCards[activeUnits[unit]].type === 5) {
				if (movementMethod === 2) {
					movementMethod = 3;
				}
			}
			if (referenceCards[activeUnits[unit]].speed < maxSpeed) {
				maxSpeed = referenceCards[activeUnits[unit]].speed;
			}
		}
		for (var ter = 0; ter < territoryStateInfo.length; ter++) {
			$('#territoryArea' + ter).removeClass('viableMovement');
		}
		var checkedTers = [activeTer];
		var oldCheckedTers = 0;
		console.log('maxSpeed: ' + maxSpeed);
		for (var speedI = 0; speedI < maxSpeed; speedI++) {
			var tempCheckedTers = checkedTers.length;
			for (var currentTer = oldCheckedTers; currentTer < tempCheckedTers; currentTer++) {
				if (territoryStateInfo[currentTer].naturalHazardIDs.length > 0) {
					//moveable/attackeable by: 0=ground, 1=naval, 2, flying
					var canMoveFrom = [1,1,1];
					var canAttackFrom = [1,1,1];
					for (var hazard = 0; hazard < territoryStateInfo[currentTer].naturalHazardIDs.length; hazard++) {
						switch(referenceCards[territoryStateInfo[currentTer].naturalHazardIDs[hazard]].name) {
							case 'Earthquake':
								canMoveFrom[0] = 0;
								break;
							case 'Lightning Storm':
								canAttackFrom[2] = 0;
								canMoveFrom[2] = 0;
								break;
							case 'Maelstrom':
								canMoveFrom[1] = 0;
								canAttackFrom[1] = 0;
								break;
							case 'Sandstorm':
								canAttackFrom[0] = 0;
								canAttackFrom[2] = 0;
								canMoveFrom[0] = 0;
								canMoveFrom[2] = 0;
								break;
							case 'Tornado':
								canMoveFrom[0] = 0;
								canMoveFrom[1] = 0;
								canMoveFrom[2] = 0;
								break;
						}
					}
				}
				for (var adj = 0; adj < territoryStateInfo[checkedTers[currentTer]].adjacentTer.length; adj++) {
					var tempAdjID = territoryStateInfo[checkedTers[currentTer]].adjacentTer[adj];
					//moveable/attackeable by: 0=ground, 1=naval, 2, flying
					var canMoveTo = [1,1,1];
					var canAttackTo = [1,1,1];
					if (checkedTers.indexOf(tempAdjID) === -1 || (checkedTers.indexOf(tempAdjID) !== -1 && (speedI + 1) < territoryStateInfo[tempAdjID].speedSpent)) {
						switch(territoryStateInfo[tempAdjID].type) {
							case 0: /*ground*/
								switch(movementMethod) {
									case -99: /*incompatible*/
										switch(territoryStateInfo[tempAdjID].occupiedByPlayer) {
											case -1: break;
											case playerNumber: break;
											default: 
												if (territoryStateInfo[tempAdjID].occupiedByUnits.length > 0) {
													if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
														for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
															switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
																case 'Earthquake':
																	break;
																case 'Lightning Storm':
																	canAttackTo[2] = 0;
																	break;
																case 'Sandstorm':
																	canAttackTo[0] = 0;
																	canAttackTo[2] = 0;
																	break;
																case 'Tornado':
																	break;
															}
														}
													}
													if (canAttackFrom[0] === 1 && canAttackTo[0] === 1 && canAttackFrom[1] === 1 && canAttackTo[1] === 1 && canAttackFrom[2] === 1 && canAttackTo[2] === 1 && ) {
														$('#territoryArea' + tempAdjID).addClass('viableAttackTarget');
													}
												}
												break;
										}
										break;
									case 0: /*ground*/
										switch(territoryStateInfo[tempAdjID].occupiedByPlayer) {
											case -1:
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																canMoveTo[0] = 0;
																break;
															case 'Lightning Storm':
																break;
															case 'Sandstorm':
																canMoveTo[0] = 0;
																break;
															case 'Tornado':
																canMoveTo[0] = 0;
																break;
														}
													}
												}
												if (canMoveFrom[0] === 1 && canMoveTo[0] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableMovement');
												}
												break;
											case playerNumber:
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																canMoveTo[0] = 0;
																break;
															case 'Lightning Storm':
																break;
															case 'Sandstorm':
																canMoveTo[0] = 0;
																break;
															case 'Tornado':
																canMoveTo[0] = 0;
																break;
														}
													}
												}
												if (canMoveFrom[0] === 1 && canMoveTo[0] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableMovement');
												}
												break;
											default:
												//includes all players and the grimm (-2)
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																break;
															case 'Lightning Storm':
																break;
															case 'Sandstorm':
																canAttackTo[0] = 0;
																break;
															case 'Tornado':
																break;
														}
													}
												}
												if (canAttackFrom[0] === 1 && canAttackTo[0] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableAttackTarget');
												}
												break;
										}
										break;
									case 1: /*naval*/
										canMoveTo[1] = 0;
										switch(territoryStateInfo[tempAdjID].occupiedByPlayer) {
											case -1:
												break;
											case playerNumber:
												break;
											default:
												//includes all players and the grimm (-2)
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																break;
															case 'Lightning Storm':
																break;
															case 'Sandstorm':
																canAttackTo[1] = 0;
																break;
															case 'Tornado':
																break;
														}
													}
												}
												if (canAttackFrom[1] === 1 && canAttackTo[1] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableAttackTarget');
												}
												break;
										}
										break;
									case 2: /*flying*/
										switch(territoryStateInfo[tempAdjID].occupiedByPlayer) {
											case -1:
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																break;
															case 'Lightning Storm':
																canMoveTo[2] = 0;
																break;
															case 'Sandstorm':
																canMoveTo[2] = 0;
																break;
															case 'Tornado':
																canMoveTo[2] = 0;
																break;
														}
													}
												}
												if (canMoveFrom[2] === 1 && canMoveTo[2] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableMovement');
												}
												break;
											case playerNumber:
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																break;
															case 'Lightning Storm':
																canMoveTo[2] = 0;
																break;
															case 'Sandstorm':
																canMoveTo[2] = 0;
																break;
															case 'Tornado':
																canMoveTo[2] = 0;
																break;
														}
													}
												}
												if (canMoveFrom[2] === 1 && canMoveTo[2] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableMovement');
												}
												break;
											default:
												//includes all players and the grimm (-2)
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																break;
															case 'Lightning Storm':
																canAttackTo[2] = 0;
																break;
															case 'Sandstorm':
																canAttackTo[2] = 0;
																break;
															case 'Tornado':
																break;
														}
													}
												}
												if (canAttackFrom[2] === 1 && canAttackTo[2] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableAttackTarget');
												}
												break;
										}
										break;
									case 3: /*ground/naval*/
										switch(territoryStateInfo[tempAdjID].occupiedByPlayer) {
											case -1:
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																canMoveTo[0] = 0;
																break;
															case 'Lightning Storm':
																break;
															case 'Sandstorm':
																canMoveTo[0] = 0;
																break;
															case 'Tornado':
																canMoveTo[0] = 0;
																break;
														}
													}
												}
												if (canMoveFrom[0] === 1 && canMoveTo[0] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableMovement');
												}
												break;
											case playerNumber:
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																canMoveTo[0] = 0;
																break;
															case 'Lightning Storm':
																break;
															case 'Sandstorm':
																canMoveTo[0] = 0;
																break;
															case 'Tornado':
																canMoveTo[0] = 0;
																break;
														}
													}
												}
												if (canMoveFrom[0] === 1 && canMoveTo[0] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableMovement');
												}
												break;
											default:
												//includes all players and the grimm (-2)
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																break;
															case 'Lightning Storm':
																break;
															case 'Sandstorm':
																canAttackTo[0] = 0;
																canAttackTo[1] = 0;
																break;
															case 'Tornado':
																break;
														}
													}
												}
												if (canAttackFrom[0] === 1 && canAttackTo[0] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableAttackTarget');
												}
												break;
										}
										break;
								}
							case 1: /*naval*/
								switch(movementMethod) {
									case -99: /*incompatible*/
										switch(territoryStateInfo[tempAdjID].occupiedByPlayer) {
											case -1: break;
											case playerNumber: break;
											default: 
												if (territoryStateInfo[tempAdjID].occupiedByUnits.length > 0) {
													if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
														for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
															switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
																case 'Lightning Storm':
																	canAttackTo[2] = 0;
																	break;
																case 'Maelstrom':
																	canAttackTo[1] = 0;
																	break;
																case 'Tornado':
																	break;
															}
														}
													}
													if (canAttackFrom[0] === 1 && canAttackTo[0] === 1 && canAttackFrom[1] === 1 && canAttackTo[1] === 1 && canAttackFrom[2] === 1 && canAttackTo[2] === 1 && ) {
														$('#territoryArea' + tempAdjID).addClass('viableAttackTarget');
													}
												}
												break;
										}
										break;
									case 0: /*ground*/
										switch(territoryStateInfo[tempAdjID].occupiedByPlayer) {
											case -1:
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																canMoveTo[0] = 0;
																break;
															case 'Lightning Storm':
																break;
															case 'Sandstorm':
																canMoveTo[0] = 0;
																break;
															case 'Tornado':
																canMoveTo[0] = 0;
																break;
														}
													}
												}
												if (canMoveFrom[0] === 1 && canMoveTo[0] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableMovement');
												}
												break;
											case playerNumber:
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																canMoveTo[0] = 0;
																break;
															case 'Lightning Storm':
																break;
															case 'Sandstorm':
																canMoveTo[0] = 0;
																break;
															case 'Tornado':
																canMoveTo[0] = 0;
																break;
														}
													}
												}
												if (canMoveFrom[0] === 1 && canMoveTo[0] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableMovement');
												}
												break;
											default:
												//includes all players and the grimm (-2)
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																break;
															case 'Lightning Storm':
																break;
															case 'Sandstorm':
																canAttackTo[0] = 0;
																break;
															case 'Tornado':
																break;
														}
													}
												}
												if (canAttackFrom[0] === 1 && canAttackTo[0] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableAttackTarget');
												}
												break;
										}
										break;
									case 1: /*naval*/
										canMoveTo[1] = 0;
										switch(territoryStateInfo[tempAdjID].occupiedByPlayer) {
											case -1:
												break;
											case playerNumber:
												break;
											default:
												//includes all players and the grimm (-2)
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																break;
															case 'Lightning Storm':
																break;
															case 'Sandstorm':
																canAttackTo[1] = 0;
																break;
															case 'Tornado':
																break;
														}
													}
												}
												if (canAttackFrom[1] === 1 && canAttackTo[1] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableAttackTarget');
												}
												break;
										}
										break;
									case 2: /*flying*/
										switch(territoryStateInfo[tempAdjID].occupiedByPlayer) {
											case -1:
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																break;
															case 'Lightning Storm':
																canMoveTo[2] = 0;
																break;
															case 'Sandstorm':
																canMoveTo[2] = 0;
																break;
															case 'Tornado':
																canMoveTo[2] = 0;
																break;
														}
													}
												}
												if (canMoveFrom[2] === 1 && canMoveTo[2] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableMovement');
												}
												break;
											case playerNumber:
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																break;
															case 'Lightning Storm':
																canMoveTo[2] = 0;
																break;
															case 'Sandstorm':
																canMoveTo[2] = 0;
																break;
															case 'Tornado':
																canMoveTo[2] = 0;
																break;
														}
													}
												}
												if (canMoveFrom[2] === 1 && canMoveTo[2] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableMovement');
												}
												break;
											default:
												//includes all players and the grimm (-2)
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																break;
															case 'Lightning Storm':
																canAttackTo[2] = 0;
																break;
															case 'Sandstorm':
																canAttackTo[2] = 0;
																break;
															case 'Tornado':
																break;
														}
													}
												}
												if (canAttackFrom[2] === 1 && canAttackTo[2] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableAttackTarget');
												}
												break;
										}
										break;
									case 3: /*ground/naval*/
										switch(territoryStateInfo[tempAdjID].occupiedByPlayer) {
											case -1:
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																canMoveTo[0] = 0;
																break;
															case 'Lightning Storm':
																break;
															case 'Sandstorm':
																canMoveTo[0] = 0;
																break;
															case 'Tornado':
																canMoveTo[0] = 0;
																break;
														}
													}
												}
												if (canMoveFrom[0] === 1 && canMoveTo[0] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableMovement');
												}
												break;
											case playerNumber:
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																canMoveTo[0] = 0;
																break;
															case 'Lightning Storm':
																break;
															case 'Sandstorm':
																canMoveTo[0] = 0;
																break;
															case 'Tornado':
																canMoveTo[0] = 0;
																break;
														}
													}
												}
												if (canMoveFrom[0] === 1 && canMoveTo[0] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableMovement');
												}
												break;
											default:
												//includes all players and the grimm (-2)
												if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
													for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
														switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
															case 'Earthquake':
																break;
															case 'Lightning Storm':
																break;
															case 'Sandstorm':
																canAttackTo[0] = 0;
																canAttackTo[1] = 0;
																break;
															case 'Tornado':
																break;
														}
													}
												}
												if (canAttackFrom[0] === 1 && canAttackTo[0] === 1) {
													$('#territoryArea' + tempAdjID).addClass('viableAttackTarget');
												}
												break;
										}
										break;
								}
						}
					}
				}
			}
			/*
			var tempCheckedTers = checkedTers.length;
			for (var currentTer = oldCheckedTers; currentTer < tempCheckedTers; currentTer++) {
				for (var adj = 0; adj < territoryStateInfo[checkedTers[currentTer]].adjacentTer.length; adj++) {
					var tempTerID = territoryStateInfo[checkedTers[currentTer]].adjacentTer[adj];
					if (checkedTers.indexOf(tempTerID) === -1 || (checkedTers.indexOf(tempTerID) !== -1 && (speedI + 1) < territoryStateInfo[tempTerID].speedSpent)) {
						switch(territoryStateInfo[tempTerID].type) {
							case 0:
								switch(movementMethod) {
									case -99:
										switch(territoryStateInfo[tempAdjID].occupiedByPlayer) {
											case -1: break;
											case playerNumber: break;
											default: 
												if (territoryStateInfo[tempAdjID].occupiedByUnits.length > 0) {
													if (territoryStateInfo[tempAdjID].naturalHazardIDs.length > 0) {
														//moveable/attackeable by: 0=ground, 1=naval, 2, flying
														var canMoveTo = [0,0,0];
														var canAttackTo = [1,1,1];
														for (var hazard = 0; hazard < territoryStateInfo[tempAdjID].naturalHazardIDs.length; hazard++) {
															switch(referenceCards[territoryStateInfo[tempAdjID].naturalHazardIDs[hazard]].name) {
																case 'Earthquake':
																	canMoveTo[0] = 0;
																	break;
																case 'Lightning Storm':
																	canAttackTo[2] = 0;
																	canMoveTo[2] = 0;
																	break;
																case 'Maelstrom':
																	canMoveTo[1] = 0;
																	break;
																case 'Sandstorm':
																	canAttackTo[0] = 0;
																	canAttackTo[2] = 0;
																	canMoveTo[0] = 0;
																	canMoveTo[2] = 0;
																	break;
																case 'Tornado':
																	canMoveTo[0] = 0;
																	canMoveTo[1] = 0;
																	canMoveTo[2] = 0;
																	break;
															}
														}
														if (canAttackTo[0] === 1 && canAttackTo[1] === 1) {
															$('#territoryArea' + tempAdjID).addClass('viableAttackTarget');
														}
													} else {
														$('#territoryArea' + tempAdjID).addClass('viableAttackTarget');
													}
												}
												break;
										}
										break;
								}
						}
						//still need to filter territories on present natural hazards
						if ((territoryStateInfo[tempTerID].type === movementMethod || movementMethod === 2 || movementMethod === 3) && (territoryStateInfo[tempTerID].occupiedByPlayer === -1 || territoryStateInfo[tempTerID].occupiedByPlayer === playerNumber)) {
							$('#territoryArea' + tempTerID).addClass('viableMovement');
							checkedTers.push(territoryStateInfo[checkedTers[currentTer]].adjacentTer[adj]);
						} else if (territoryStateInfo[tempTerID].occupiedByPlayer !== -1 && territoryStateInfo[tempTerID].occupiedByPlayer !== playerNumber) {
							if (movementMethod === 2) {
								checkedTers.push(territoryStateInfo[checkedTers[currentTer]].adjacentTer[adj]);
								$('#territoryArea' + tempTerID).addClass('viableAttackTarget');
							} else if (true) {}
						}
					}
				}
			}
			*/
		}
		//console.log('Checking for valid attack targets');
		//$('#territoryArea' + ter).addClass('viableTarget');
	}
});