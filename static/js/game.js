var socket = io();
var jsCookie = Cookies.noConflict();

//the following values are placeholders to be received from the server on page initialization
var commName = ['Ruby Rose', 'Weiss Schnee', 'Blake Belladonna', 'Yang Xiao-Long'];
var kingdom = [0, 1, 2, 3];
var kingdomByPlayer = ['Mantle', 'Mistral', 'Vacuo', 'Vale'];
//playerByKingdom are the player numbers (0-3) that control which kingdom
//order: 0=Mantle, 1=Mistral, 2=Vacuo, 3=Vale
var playerByKingdom = [0,1,2,3];
var kingdomPicArray = ['images/Atlas_Symbol.svg.png', 'images/Mistral_Symbol.svg.png', 'images/Vacuo_Symbol.svg.png', 'images/Vale_Symbol.svg.png'];
//playerNumber is directly used as index, so ranges from 0 to 3
var playerNumber = 1;
var nOfCards = [1,2,3,4,99];
var common = 5;
var uncommon = 3;
var rare = 1;
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
	/*end of grid lines*/
	[{x:18.5,y:26.5},{x:20.5,y:18},{x:25,y:20.5},{x:27.5,y:21.5},{x:26.5,y:26},{x:24.5,y:24.5},{x:20,y:29},{x:23,y:23}],
	[{x:27.5,y:21.5},{x:29,y:20},{x:30.5,y:23.5},{x:33,y:25},{x:33,y:31.5},{x:27,y:29},{x:26.5,y:26},{x:30,y:25.75}],
	[{x:29,y:20},{x:28,y:16},{x:29,y:10.5},{x:35,y:9},{x:39.5,y:9.5},{x:41,y:10},{x:40.5,y:12},{x:35,y:13},{x:35,y:15},{x:40,y:18},{x:40,y:20.5},{x:35,y:19.5},{x:32,y:17.5},{x:29,y:20},{x:32.5,y:13.5}],
	[{x:29,y:20},{x:32,y:17.5},{x:35,y:19.5},{x:35,y:21},{x:39.5,y:26},{x:39.5,y:28},{x:37.5,y:27.5},{x:37,y:26},{x:33.5,y:23},{x:33,y:25},{x:30.5,y:23.5},{x:33,y:21}],
	[{x:33,y:28},{x:45,y:34.5},{x:45,y:36},{x:40,y:36.5},{x:33,y:31.5},{x:40,y:33.5}],
	[{x:27,y:29},{x:33,y:31.5},{x:32.5,y:42},{x:24,y:36},{x:24.5,y:31.5},{x:29.5,y:34}],
	[{x:33,y:31.5},{x:40,y:36.5},{x:40,y:40.5},{x:38,y:43},{x:36.5,y:40.5},{x:34,y:40.5},{x:32.5,y:42},{x:37,y:37}],
	[{x:25.5,y:37},{x:32.5,y:42},{x:31,y:50},{x:29.5,y:50.5},{x:26.5,y:45},{x:25.5,y:40},{x:29.5,y:43}],
	//end of dragon continent
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
	[{x:58,y:13},{x:63.5,y:10},{x:63.5,y:8.5},{x:64.5,y:8.5},{x:65,y:13},{x:66.5,y:19},{x:66,y:20},{x:65.5,y:20.5},{x:64.5,y:19},{x:63,y:19.5},{x:62,y:15.5},{x:59.5,y:17},{x:63.5,y:13.5}],
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
	[{x:20.5,y:18},{x:21,y:14},{x:25,y:13.5},{x:28.5,y:13.5},{x:28,y:16},{x:29,y:20},{x:25,y:20.5},{x:25.5,y:16.5}],
	[{x:21,y:14},{x:20.5,y:8},{x:25.5,y:7},{x:30,y:7.5},{x:30.5,y:10},{x:29,y:10.5},{x:28.5,y:13.5},{x:25,y:13.5},{x:25.5,y:10}],
	[{x:30,y:7.5},{x:30.5,y:5},{x:34,y:4.5},{x:40,y:5},{x:39.5,y:9.5},{x:35,y:9},{x:30.5,y:10},{x:35,y:6.5}],
	[{x:39.5,y:9.5},{x:40,y:5},{x:41,y:4},{x:42.5,y:4.5},{x:43,y:7},{x:42,y:7.5},{x:42,y:8},{x:42.5,y:10},{x:49,y:10.5},{x:49.5,y:12},{x:47.5,y:13},{x:45.5,y:17},{x:42.5,y:15.5},{x:40.5,y:12},{x:41,y:10},{x:44.5,y:13}],
	[{x:43,y:7},{x:42.5,y:4.5},{x:42.5,y:3},{x:48,y:2.5},{x:53,y:4},{x:56,y:3.5},{x:58.5,y:5},{x:58,y:7},{x:55,y:7},{x:54,y:8},{x:53,y:7},{x:48,y:6.5},{x:50,y:4.5}],
	[{x:58,y:7},{x:58.5,y:5},{x:57,y:4},{x:57.5,y:3},{x:63,y:3},{x:65,y:4},{x:67,y:6.5},{x:67,y:10.5},{x:66.5,y:12.5},{x:65,y:13},{x:64.5,y:8.5},{x:63.5,y:8.5},{x:62.5,y:6.5},{x:61.5,y:6.5},{x:59.5,y:7.5},{x:64,y:5.5}],
	[{x:65,y:13},{x:66.5,y:12.5},{x:67,y:10.5},{x:68.5,y:10.5},{x:69.5,y:13},{x:70,y:19},{x:68.5,y:22},{x:67,y:21.5},{x:66,y:20},{x:66.5,y:19},{x:65,y:13},{x:68,y:16}],
	//end of naval 40's
	[{x:57,y:21.5},{x:58.5,y:19.5},{x:59.5,y:17},{x:62,y:15.5},{x:63,y:19.5},{x:64.5,y:19},{x:65.5,y:20.5},{x:66,y:20},{x:67,y:21.5},{x:64,y:25},{x:59.5,y:25.5},{x:61.5,y:21}],
	[{x:50.5,y:28.5},{x:50.5,y:23.75},{x:52.5,y:23.5},{x:53,y:21.5},{x:57,y:21.5},{x:59.5,y:25.5},{x:57.5,y:30},{x:52,y:31},{x:55,y:26}],
	[{x:35,y:15},{x:35,y:13},{x:40.5,y:12},{x:42.5,y:15.5},{x:45.5,y:17},{x:44,y:20},{x:40,y:20},{x:40,y:18},{x:40,y:14.5}],
	[{x:35,y:21},{x:35,y:19.5},{x:40,y:20.5},{x:40,y:20},{x:44,y:20},{x:44,y:21},{x:45,y:21.5},{x:44,y:24},{x:43,y:26},{x:39.5,y:26},{x:41.5,y:23}],
	[{x:45,y:36},{x:45,y:34.5},{x:44,y:34},{x:45,y:29.5},{x:43,y:26},{x:44,y:24},{x:45,y:21.5},{x:48.5,y:20},{x:48,y:22},{x:48.5,y:24},{x:50.5,y:23.75},{x:50.5,y:28.5},{x:48,y:28},{x:47.7,y:32},{x:46,y:32.5},{x:45.8,y:36},{x:46.5,y:26}],
	[{x:33,y:25},{x:33.5,y:23},{x:37,y:26},{x:37.5,y:27.5},{x:39.5,y:28},{x:39.5,y:26},{x:43,y:26},{x:45,y:29.5},{x:44,y:34},{x:33,y:28},{x:42.5,y:29.5}],
	[{x:39,y:46},{x:38,y:43},{x:40,y:40.5},{x:40,y:36.5},{x:45.8,y:36},{x:45.5,y:38.5},{x:43,y:41},{x:42,y:46},{x:42,y:40}],
	[{x:35.5,y:40.5},{x:36.5,y:40.5},{x:38,y:43},{x:39,y:46},{x:38.5,y:47},{x:40,y:54},{x:37,y:57},{x:35.5,y:51},{x:37.5,y:48.5}],
	[{x:32,y:60.5},{x:32,y:54},{x:31,y:50},{x:32.5,y:42},{x:34,y:40.5},{x:35.5,y:40.5},{x:35.5,y:51},{x:37,y:57},{x:34,y:60},{x:33.75,y:50}],
	[{x:27,y:61},{x:27,y:56},{x:28,y:56},{x:28,y:53},{x:27,y:48.5},{x:27.5,y:47},{x:29.5,y:50.5},{x:31,y:50},{x:32,y:54},{x:32,y:60.5},{x:30.3,y:61},{x:30,y:55}],
	//end of naval 50's
	[{x:21,y:42.25},{x:21,y:36},{x:24,y:36},{x:25.5,y:37},{x:25.5,y:40},{x:26.5,y:45},{x:27.5,y:47},{x:27,y:48.5},{x:23,y:43},{x:23.5,y:39.5}],
	[{x:20,y:29},{x:24.5,y:24.5},{x:26.5,y:26},{x:27,y:29},{x:24.5,y:31.5},{x:24,y:36},{x:22.5,y:36},{x:23,y:33},{x:22.5,y:30},{x:21.5,y:29.5},{x:20.5,y:30},{x:24.5,y:28}],
	[{x:17.5,y:35},{x:16,y:33},{x:15.5,y:28},{x:16,y:24},{x:17.5,y:22.5},{x:19.5,y:22.5},{x:18.5,y:26.5},{x:20,y:29},{x:20.5,y:30},{x:21,y:32},{x:21,y:42.25},{x:19,y:41.5},{x:18.5,y:35},{x:18.5,y:30}],
	[{x:16,y:24},{x:14,y:18},{x:13,y:11},{x:16,y:5},{x:18.5,y:3.5},{x:22.5,y:3.5},{x:23,y:7.5},{x:20.5,y:8},{x:21,y:14},{x:20.5,y:18},{x:19.5,y:22.5},{x:17.5,y:22.5},{x:17.5,y:13}],
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
	[{x:3,y:83},{x:4.5,y:76},{x:9,y:79},{x:8.5,y:84},{x:5.5,y:87},{x:6.5,y:81}],
	[{x:2.5,y:91},{x:3,y:88},{x:4.5,y:85.5},{x:5.5,y:87},{x:8.5,y:84},{x:11,y:90},{x:10.5,y:95.5},{x:8,y:96.5},{x:4,y:95},{x:7,y:91}],
	[{x:10.5,y:95.5},{x:11,y:90},{x:18,y:92},{x:21,y:91},{x:21.5,y:93},{x:21,y:96.5},{x:18,y:95},{x:14,y:94.5},{x:16,y:93}],
	[{x:18,y:85},{x:18.5,y:80},{x:20.5,y:80.5},{x:27,y:82.5},{x:26.5,y:86.5},{x:24.5,y:85.5},{x:24,y:86.5},{x:21,y:87},{x:22.5,y:83.5}],
	//end of naval 70's
	[{x:21,y:96.5},{x:21.5,y:93},{x:21,y:91},{x:21,y:87},{x:24,y:86.5},{x:25,y:90},{x:26,y:90.5},{x:27.5,y:90},{x:30,y:90},{x:30.5,y:94},{x:29.5,y:97},{x:26,y:96},{x:26,y:93}],
	[{x:18,y:69},{x:21,y:67.5},{x:22.5,y:70},{x:24,y:70},{x:24.5,y:75},{x:25.5,y:76.5},{x:25,y:79.5},{x:21.5,y:77},{x:19,y:75},{x:22,y:73}],
	[{x:26.5,y:86.5},{x:27,y:82.5},{x:27,y:81},{x:25,y:79.5},{x:25.5,y:76.5},{x:27,y:78.5},{x:30.3,y:77},{x:31.5,y:77.5},{x:33.5,y:77.5},{x:34,y:81.5},{x:32,y:81.5},{x:30,y:82},{x:30,y:84},{x:34.5,y:84.5},{x:35,y:88},{x:34,y:89},{x:30,y:90},{x:27.5,y:90},{x:27,y:87.5},{x:29,y:84}],
	[{x:33.5,y:77.5},{x:35,y:77.5},{x:36,y:76},{x:39,y:74},{x:43,y:74},{x:43.5,y:78},{x:41,y:80},{x:38.5,y:81},{x:38,y:80},{x:36,y:80.5},{x:35,y:81.5},{x:34,y:81.5},{x:39,y:77.5}],
	[{x:34.5,y:84.5},{x:38,y:82.5},{x:38.5,y:81},{x:41,y:80},{x:43.5,y:78},{x:44,y:82},{x:40.5,y:85},{x:38.5,y:88},{x:36.5,y:89},{x:35,y:88},{x:39.5,y:83.5}],
	[{x:29.5,y:97},{x:30.5,y:94},{x:30,y:90},{x:34,y:89},{x:35,y:88},{x:36.5,y:89},{x:38.5,y:88},{x:39,y:92},{x:37.5,y:95.5},{x:33.5,y:97},{x:34.5,y:92.5}],
	[{x:39,y:92},{x:38.5,y:88},{x:40.5,y:85},{x:44,y:82},{x:47,y:81.5},{x:47,y:85.5},{x:41.5,y:88},{x:41.5,y:90},{x:40.5,y:92},{x:44,y:84.5}],
	[{x:37.5,y:95.5},{x:39,y:92},{x:40.5,y:92},{x:41.5,y:90},{x:44,y:91},{x:47,y:88.5},{x:47.5,y:92},{x:47,y:94.5},{x:44,y:96},{x:41,y:96.5},{x:43,y:93}],
	[{x:44,y:82},{x:43,y:74},{x:45,y:70.5},{x:47.5,y:76},{x:47.5,y:79},{x:47,y:81.5},{x:45.5,y:76.5}],
	[{x:45,y:70.5},{x:47,y:67},{x:48,y:64},{x:50.5,y:63.5},{x:52,y:67},{x:52,y:72},{x:50,y:76},{x:47.5,y:76},{x:49,y:70}],
	//end of naval 80's
	[{x:52,y:72},{x:52,y:67},{x:54.5,y:63},{x:57,y:62},{x:57.5,y:64.5},{x:58.5,y:74},{x:57.5,y:75},{x:56,y:73.5},{x:53.5,y:74},{x:55.5,y:69}],
	[{x:50.5,y:63.5},{x:55.5,y:52},{x:55.5,y:49},{x:57,y:49},{x:58.5,y:53},{x:58.5,y:55},{x:57.5,y:58},{x:57,y:62},{x:54.5,y:63},{x:52,y:67},{x:55.5,y:58}],
	[{x:62.5,y:45.5},{x:62.5,y:42},{x:66,y:40},{x:68,y:41.5},{x:66,y:43.5},{x:66,y:44.5},{x:68,y:45.5},{x:68,y:47.5},{x:66,y:49.5},{x:64.5,y:48},{x:65,y:44}],
	[{x:55,y:41},{x:56,y:36},{x:59,y:33},{x:61,y:35},{x:57.5,y:46},{x:57,y:49},{x:55.5,y:49},{x:55.5,y:46.5},{x:56,y:45},{x:56,y:43},{x:58,y:38.5}],
	[{x:50.5,y:39.5},{x:50.5,y:37},{x:51.5,y:37},{x:52.5,y:36},{x:52,y:31},{x:57.5,y:30},{x:59,y:33},{x:56,y:36},{x:55,y:41},{x:53.5,y:41},{x:54.5,y:35}],
	[{x:57.5,y:30},{x:59.5,y:25.5},{x:64,y:25},{x:63.5,y:29.5},{x:64.5,y:34},{x:61,y:35},{x:59,y:33},{x:61.5,y:30}],
	[{x:63.5,y:29.5},{x:64,y:25},{x:67,y:21.5},{x:68.5,y:22},{x:68,y:26},{x:66.5,y:27},{x:66,y:30},{x:66.5,y:33.5},{x:64.5,y:34},{x:65.5,y:27}],
	[{x:66.5,y:33.5},{x:66,y:30},{x:66.5,y:27},{x:68,y:26},{x:70.5,y:27},{x:71.5,y:32},{x:72,y:38},{x:70,y:38},{x:70,y:35},{x:68,y:33},{x:69,y:30}],
	[{x:68,y:26},{x:68.5,y:22},{x:70,y:19},{x:72,y:20},{x:73.5,y:25},{x:73.5,y:30},{x:71.5,y:32},{x:70.5,y:27},{x:71,y:24}],
	[{x:73.5,y:30},{x:73.5,y:25},{x:72,y:20},{x:75.5,y:17},{x:78.5,y:20},{x:79,y:25},{x:78,y:29.5},{x:75,y:28.5},{x:76,y:23}],
	//end of naval 90's
	[{x:70,y:19},{x:69.5,y:13},{x:68.5,y:10.5},{x:72,y:9.5},{x:75,y:9.5},{x:76,y:13},{x:75.5,y:17},{x:72,y:20},{x:72.5,y:14}],
	[{x:67,y:10.5},{x:67,y:6.5},{x:69.5,y:5},{x:74,y:4},{x:77,y:5.5},{x:78,y:10.5},{x:76,y:13},{x:75,y:9.5},{x:72,y:9.5},{x:68.5,y:10.5},{x:73,y:7}],
	[{x:75.5,y:17},{x:76,y:13},{x:78,y:10.5},{x:77,y:5.5},{x:80,y:5},{x:81,y:17},{x:78.5,y:20},{x:78.5,y:14.5}],
	[{x:79,y:25},{x:78.5,y:20},{x:81,y:17},{x:80.5,y:11},{x:85,y:9.5},{x:88,y:11},{x:89,y:18},{x:87,y:23},{x:83,y:25},{x:84,y:17.5}],
	[{x:89,y:18},{x:88,y:11},{x:89,y:7},{x:93,y:6.5},{x:96,y:9.5},{x:96.5,y:14},{x:94,y:18},{x:91.5,y:19},{x:92,y:12.5}],
	[{x:87,y:23},{x:89,y:18},{x:91.5,y:19},{x:94,y:18},{x:96.5,y:14},{x:97.5,y:16},{x:97.5,y:22},{x:95.5,y:25.5},{x:92,y:28.5},{x:89.5,y:28.5},{x:92.5,y:22.5}],
	[{x:84,y:29.5},{x:83,y:25},{x:87,y:23},{x:89.5,y:28.5},{x:92,y:28.5},{x:93,y:33},{x:89.5,y:34},{x:87,y:30},{x:86.5,y:26.5}],
	[{x:74,y:39},{x:75,y:33.5},{x:77.5,y:32},{x:79,y:25},{x:83,y:25},{x:84,y:29.5},{x:80.5,y:31},{x:79.5,y:36},{x:77.5,y:39},{x:80.5,y:28}],
	[{x:77.5,y:39},{x:79.5,y:36},{x:80.5,y:31},{x:84,y:29.5},{x:87,y:30},{x:89.5,y:34},{x:90,y:37.5},{x:89,y:39},{x:87,y:35},{x:83,y:35},{x:82,y:39},{x:79.5,y:42},{x:84,y:32.5}],
	[{x:73,y:41.5},{x:74,y:39},{x:77.5,y:39},{x:79.5,y:42},{x:80.5,y:48},{x:80,y:54},{x:76,y:52},{x:76.5,y:47.5},{x:74.5,y:45},{x:74.5,y:43},{x:77.5,y:45}],
	[{x:80,y:45},{x:79.5,y:42},{x:82,y:39},{x:83,y:35},{x:87,y:35},{x:89,y:39},{x:89,y:43},{x:87,y:47},{x:83,y:47},{x:85,y:41}],
	//end of naval 100's
	[{x:80,y:54},{x:80.5,y:48},{x:80,y:45},{x:83,y:47},{x:87,y:47},{x:87,y:49.5},{x:85.5,y:51},{x:85,y:51},{x:83,y:53},{x:83,y:49.5}],
	[{x:87,y:49.5},{x:87,y:47},{x:89,y:43},{x:89,y:39},{x:90,y:37.5},{x:89.5,y:34},{x:93,y:33},{x:93.5,y:42},{x:91,y:48.5},{x:91,y:42}],
	[{x:91,y:48.5},{x:93.5,y:42},{x:93,y:33},{x:92,y:28.5},{x:95,y:26},{x:96.5,y:30},{x:97,y:42},{x:97,y:49},{x:93.5,y:50.5},{x:95,y:39}],
	[{x:86,y:58},{x:85.5,y:51},{x:87,y:49.5},{x:91,y:48.5},{x:93.5,y:50.5},{x:93,y:55},{x:90.5,y:58},{x:89.5,y:53}],
	[{x:91,y:63},{x:90.5,y:58},{x:93,y:55},{x:93.5,y:50.5},{x:97,y:49},{x:97,y:56},{x:95,y:61},{x:94.5,y:56.5}],
	[{x:84,y:68},{x:84,y:64},{x:85,y:64},{x:86,y:58},{x:90.5,y:58},{x:91,y:63},{x:91,y:68},{x:87.5,y:69},{x:88,y:63.5}],
	[{x:73.5,y:68.5},{x:73.5,y:68},{x:75.5,y:68.5},{x:77,y:68},{x:76.5,y:65.5},{x:73.5,y:66},{x:75,y:62},{x:82,y:62},{x:84,y:64},{x:84,y:68},{x:81,y:70},{x:75.5,y:70},{x:80,y:66}],
	[{x:74,y:79},{x:74,y:73},{x:75.5,y:70},{x:80,y:70},{x:80,y:75},{x:78,y:79},{x:77,y:74.5}],
	[{x:67.5,y:81},{x:69,y:75.5},{x:71.5,y:75},{x:71.5,y:69.5},{x:73.5,y:68.5},{x:75.5,y:70},{x:74,y:73},{x:74,y:79},{x:72.5,y:81},{x:71.5,y:78}],
	//end of naval 110's
	[{x:65.5,y:82},{x:65,y:78},{x:66.5,y:68},{x:71.5,y:69.5},{x:71.5,y:71},{x:69,y:73},{x:69,y:75.5},{x:67.5,y:81},{x:67.5,y:75}],
	[{x:62,y:76},{x:61,y:67},{x:62,y:63.5},{x:63.5,y:64},{x:65,y:64},{x:67,y:63},{x:66.5,y:68},{x:65,y:78},{x:64,y:70}],
	[{x:57.5,y:84},{x:57,y:79},{x:61,y:78},{x:62,y:76},{x:65,y:78},{x:65.5,y:82},{x:65.5,y:83},{x:62,y:85},{x:61.5,y:81}],
	[{x:52,y:83},{x:52,y:79},{x:53,y:77},{x:57,y:79},{x:57.5,y:84},{x:57,y:88},{x:55,y:87.5},{x:54.5,y:84},{x:55,y:81}],
	[{x:47,y:81.5},{x:47.5,y:79},{x:47.5,y:76},{x:50,y:76},{x:52,y:72},{x:53.5,y:74},{x:53,y:77},{x:52,y:79},{x:52,y:80},{x:49,y:81.5},{x:51,y:77.5}],
	[{x:47,y:94.5},{x:47.5,y:92},{x:47,y:88.5},{x:47.5,y:87},{x:47,y:85.5},{x:47,y:81.5},{x:49,y:81.5},{x:50,y:88},{x:50.5,y:94.5},{x:49,y:94},{x:48.5,y:88}],
	[{x:50,y:88},{x:49,y:81.5},{x:52,y:80},{x:52,y:83},{x:54.5,y:84},{x:55,y:87.5},{x:55,y:89.5},{x:53,y:90},{x:52,y:87},{x:52,y:85}],
	[{x:50.5,y:94.5},{x:50,y:88},{x:52,y:87},{x:53,y:90},{x:55,y:89.5},{x:55,y:87.5},{x:57,y:88},{x:56.5,y:95},{x:54.5,y:93.5},{x:52.5,y:93.5},{x:53.5,y:91.5}],
	[{x:56.5,y:95},{x:57,y:88},{x:57.5,y:84},{x:62,y:85},{x:62,y:87},{x:64.5,y:88},{x:65,y:92},{x:62,y:95},{x:60.5,y:90}],
	[{x:62,y:87},{x:62,y:85},{x:65.5,y:83},{x:69,y:84.5},{x:69,y:86},{x:68,y:87},{x:67,y:93.5},{x:65.5,y:93.5},{x:65,y:92},{x:64.5,y:88},{x:66,y:87}],
	//end of naval 120's
	[{x:63,y:94},{x:65,y:92},{x:65.5,y:93.5},{x:68,y:93.5},{x:69.5,y:89},{x:72.5,y:86.5},{x:73,y:93},{x:73,y:94.5},{x:70.5,y:96},{x:65,y:95.5},{x:71,y:92}],
	[{x:73,y:94.5},{x:73,y:93},{x:72.5,y:86.5},{x:75.5,y:86.5},{x:75,y:89},{x:75.5,y:90},{x:81,y:90},{x:81.5,y:95.5},{x:78,y:97},{x:75,y:96.5},{x:77,y:93}],
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
    territoryStateInfo.push({type:0,occupiedByPlayer:-1,occupiedByUnits:[],naturalHazardIDs:[]})
}
for (var i = 8; i <= 14; i++) {
    territoryStateInfo.push({type:0,occupiedByPlayer:playerByKingdom[2],occupiedByUnits:[],naturalHazardIDs:[]})
}
territoryStateInfo[10].capital = true;
for (var i = 15; i <= 24; i++) {
    territoryStateInfo.push({type:0,occupiedByPlayer:playerByKingdom[3],occupiedByUnits:[],naturalHazardIDs:[]})
}
territoryStateInfo[18].capital = true;
for (var i = 25; i <= 30; i++) {
    territoryStateInfo.push({type:0,occupiedByPlayer:playerByKingdom[0],occupiedByUnits:[],naturalHazardIDs:[]})
}
territoryStateInfo[29].capital = true;
for (var i = 31; i <= 37; i++) {
    territoryStateInfo.push({type:0,occupiedByPlayer:playerByKingdom[1],occupiedByUnits:[],naturalHazardIDs:[]})
}
territoryStateInfo[35].capital = true;
for (var i = 38; i <= 41; i++) {
    territoryStateInfo.push({type:0,occupiedByPlayer:-1,occupiedByUnits:[],naturalHazardIDs:[]})
}
for (var i = 42; i <= 137; i++) {
    territoryStateInfo.push({type:0,occupiedByPlayer:-1,occupiedByUnits:[],naturalHazardIDs:[]})
}

//affiliation: 0=none, 1=mantle, 2=mistral, 3=vacuo, 4=vale
//(transport)size: 0=normal, 1=large, 2=huge, 3=colossal, 99=immovable (structure)
//type: 0=ground, 1=naval, 2=flying, 3=structure(ground), 4=structure(naval), 5=ground/naval
//mechanical: 0=non-mechanical, 1=half-mechanical, 2=full-mechanical
//duration: 0=player turn, 1+=n rounds, 999=permanent
//natural hazards: nh0=vs ground, nh1=vs naval, nh2=vs flying
var cardInfo = [
	//unit cards
	{name:'Artificial Trunami Generator',frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:0,size:99,type:4,mechanical:2,hp:20,attack:25,speed:0,trainingTime:8,image:unitImage},
	{name:'Atlesian Air Fleet',frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:1,size:1,type:2,mechanical:2,hp:25,attack:40,speed:2,trainingTime:11,image:unitImage},
	{name:'Atlesian Bomb Drones',frequency1:0,frequency2:0,frequency3:uncommon,affiliation:1,size:0,type:0,mechanical:2,hp:15,attack:50,speed:1,trainingTime:6,image:unitImage},
	{name:'Atlesian Dreadnaught',frequency1:0,frequency2:0,frequency3:uncommon,affiliation:1,size:2,type:1,mechanical:2,hp:40,attack:40,speed:2,trainingTime:12,image:unitImage},
	{name:'Atlesian Knights',frequency1:common,frequency2:rare,frequency3:0,affiliation:3,size:0,type:0,mechanical:0,hp:15,attack:15,speed:1,trainingTime:1,image:unitImage},
	{name:'Cannonneers',frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:0,size:0,type:0,mechanical:0,hp:20,attack:25,speed:1,trainingTime:7,image:unitImage},
	{name:'Conscript',frequency1:common,frequency2:uncommon,frequency3:0,affiliation:0,size:0,type:0,mechanical:0,hp:10,attack:15,speed:1,trainingTime:0,image:unitImage},
	{name:'Faunus Slave-soldiers',frequency1:uncommon,frequency2:uncommon,frequency3:0,affiliation:0,size:0,type:0,mechanical:0,hp:10,attack:15,speed:1,trainingTime:0,image:unitImage},
	{name:'Giant Armor',frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:0,size:1,type:2,mechanical:0,hp:25,attack:40,speed:3,trainingTime:6,image:unitImage},
	{name:'Guardian Angel',frequency1:0,frequency2:0,frequency3:rare,affiliation:0,size:2,type:2,mechanical:2,hp:50,attack:40,speed:1,trainingTime:16,image:unitImage},
	{name:'Highwind Surfers',frequency1:common,frequency2:uncommon,frequency3:0,affiliation:0,size:0,type:1,mechanical:1,hp:15,attack:15,speed:2,trainingTime:3,image:unitImage},
	{name:'Imahim\'s Aerial Gunship',frequency1:0,frequency2:uncommon,frequency3:uncommon,affiliation:0,size:0,type:2,mechanical:2,hp:25,attack:25,speed:3,trainingTime:9,image:unitImage},
	{name:'Iron Whale',frequency1:0,frequency2:uncommon,frequency3:common,affiliation:0,size:1,type:1,mechanical:2,hp:25,attack:25,speed:2,trainingTime:7,image:unitImage},
	{name:'Knights of the Golden Sparrow',frequency1:rare,frequency2:uncommon,frequency3:0,affiliation:0,size:0,type:0,mechanical:0,hp:25,attack:25,speed:1,trainingTime:3,image:unitImage},
	{name:'Large Transport Ship',frequency1:0,frequency2:uncommon,frequency3:common,affiliation:0,size:2,type:1,mechanical:2,hp:35,attack:0,speed:3,trainingTime:7,transportNumber:6,transportSize:1,image:unitImage},
	{name:'Mistral Elemental Titan',frequency1:0,frequency2:0,frequency3:uncommon,affiliation:2,size:2,type:0,mechanical:0,hp:40,attack:40,speed:1,trainingTime:12,image:unitImage},
	{name:'Mistral Gliders',frequency1:uncommon,frequency2:rare,frequency3:0,affiliation:2,size:0,type:5,mechanical:1,hp:15,attack:15,speed:2,trainingTime:6,image:unitImage},
	{name:'Mistral Golems',frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:2,size:1,type:0,mechanical:2,hp:25,attack:25,speed:2,trainingTime:8,image:unitImage},
	{name:'Mistral Ironclad Warships',frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:2,size:1,type:1,mechanical:2,hp:25,attack:35,speed:3,trainingTime:8,image:unitImage},
	{name:'Orbine\'s Buccaneers',frequency1:rare,frequency2:common,frequency3:0,affiliation:0,size:1,type:1,mechanical:2,hp:20,attack:20,speed:4,trainingTime:5,image:unitImage},
	{name:'Paradroppers',frequency1:0,frequency2:0,frequency3:common,affiliation:0,size:1,type:2,mechanical:2,hp:40,attack:0,speed:2,trainingTime:12,transportNumber:4,transportSize:0,image:unitImage},
	{name:'Reckless Dustbombers',frequency1:0,frequency2:9,frequency3:0,affiliation:0,size:0,type:0,mechanical:0,hp:15,attack:25,speed:1,trainingTime:4,image:unitImage},
	{name:'Transport Ships',frequency1:uncommon,frequency2:uncommon,frequency3:0,affiliation:0,size:1,type:1,mechanical:2,hp:15,attack:0,speed:3,trainingTime:4,transportNumber:2,transportSize:0,image:unitImage},
	{name:'Unstable Dust Ships',frequency1:rare,frequency2:common,frequency3:rare,affiliation:0,size:0,type:1,mechanical:2,hp:15,attack:50,speed:3,trainingTime:4,image:unitImage},
	{name:'Vacual Beast Tamers',frequency1:0,frequency2:uncommon,frequency3:0,affiliation:3,size:1,type:0,mechanical:0,hp:25,attack:25,speed:2,trainingTime:4,image:unitImage},
	{name:'Vacual Dunesailers',frequency1:rare,frequency2:uncommon,frequency3:0,affiliation:3,size:1,type:0,mechanical:2,hp:15,attack:0,speed:3,trainingTime:4,transportNumber:2,transportSize:0,image:unitImage},
	{name:'Vacual Valkyries',frequency1:0,frequency2:0,frequency3:uncommon,affiliation:3,size:1,type:2,mechanical:0,hp:25,attack:40,speed:3,trainingTime:6,image:unitImage},
	{name:'Vacual Wolfriders',frequency1:common,frequency2:uncommon,frequency3:0,affiliation:3,size:0,type:0,mechanical:0,hp:15,attack:20,speed:3,trainingTime:4,image:unitImage},
	{name:'Valer Air Balloons',frequency1:uncommon,frequency2:uncommon,frequency3:0,affiliation:4,size:0,type:2,mechanical:2,hp:15,attack:15,speed:1,trainingTime:8,image:unitImage},
	{name:'Valer Musketeers',frequency1:rare,frequency2:uncommon,frequency3:0,affiliation:4,size:0,type:0,mechanical:0,hp:15,attack:20,speed:1,trainingTime:2,image:unitImage},
	{name:'Valer Sapphire Eye Marines',frequency1:0,frequency2:0,frequency3:common,affiliation:4,size:1,type:1,mechanical:2,hp:30,attack:25,speed:3,trainingTime:8,image:unitImage},
	{name:'Valer Sniper Squad',frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:4,size:0,type:0,mechanical:0,hp:25,attack:40,speed:1,trainingTime:4,image:unitImage},
	{name:'Wall',frequency1:common,frequency2:uncommon,frequency3:0,affiliation:0,size:99,type:3,mechanical:2,hp:15,attack:0,speed:0,trainingTime:4,image:unitImage},
	{name:'Watch Tower',frequency1:uncommon,frequency2:common,frequency3:0,affiliation:0,size:99,type:3,mechanical:2,hp:15,attack:15,speed:0,trainingTime:4,image:unitImage},
	{name:'Zeppelin Bombers',frequency1:0,frequency2:0,frequency3:rare,affiliation:0,size:1,type:2,mechanical:2,hp:25,attack:30,speed:1,trainingTime:12,image:unitImage},
	//trap cards
	{name:'Abanea Trenchdiggers',frequency1:uncommon,frequency2:uncommon,frequency3:0,affiliation:0,image:trapImage,description:''},
	{name:'Dismantler',frequency1:rare,frequency2:rare,frequency3:rare,affiliation:0,image:trapImage,description:''},
	{name:'Elemental Destabilizer',frequency1:0,frequency2:rare,frequency3:rare,affiliation:0,image:trapImage,description:''},
	{name:'Forged Armistice',frequency1:rare,frequency2:rare,frequency3:rare,affiliation:0,image:trapImage,description:''},
	{name:'Frost Dust Bombs',frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:0,image:trapImage,description:''},
	{name:'Giant Nevermore',frequency1:0,frequency2:rare,frequency3:rare,affiliation:0,image:trapImage,description:''},
	{name:'Grimm Attack',frequency1:common,frequency2:common,frequency3:uncommon,affiliation:0,image:trapImage,description:''},
	{name:'Liquid Death',frequency1:0,frequency2:uncommon,frequency3:uncommon,affiliation:0,image:trapImage,description:''},
	{name:'Minefield',frequency1:rare,frequency2:uncommon,frequency3:0,affiliation:0,image:trapImage,description:''},
	{name:'Naval Minefield',frequency1:rare,frequency2:uncommon,frequency3:0,affiliation:0,image:trapImage,description:''},
	{name:'Royal Reinstatement',frequency1:uncommon,frequency2:uncommon,frequency3:uncommon,affiliation:0,image:trapImage,description:''},
	{name:'Rusting Mists',frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:0,image:trapImage,description:''},
	{name:'Stealthy Commandeering',frequency1:0,frequency2:rare,frequency3:rare,affiliation:0,image:trapImage,description:''},
	{name:'Trapping Pit',frequency1:common,frequency2:uncommon,frequency3:0,affiliation:0,image:trapImage,description:''},
	//utility cards
	{name:'Amethyst Grove Saboteur',frequency1:rare,frequency2:rare,frequency3:rare,affiliation:0,duration:0,image:utilityImage,description:''},
	{name:'Atlesian Engineers',frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:1,duration:1,image:utilityImage,description:''},
	{name:'Concentrated Dust',frequency1:0,frequency2:uncommon,frequency3:uncommon,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Desert Scavenge',frequency1:0,frequency2:rare,frequency3:0,affiliation:0,duration:0,image:utilityImage,description:''},
	{name:'Earthquake',frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:0,nh0:1,nh1:0,nh2:0,duration:3,image:utilityImage,description:''},
	{name:'First Aid',frequency1:uncommon,frequency2:uncommon,frequency3:rare,affiliation:0,duration:0,image:utilityImage,description:''},
	{name:'Infused Armor',frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Lightning Storm',frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:0,nh0:0,nh1:0,nh2:1,duration:3,image:utilityImage,description:''},
	{name:'Maelstrom',frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:0,nh0:0,nh1:1,nh2:0,duration:3,image:utilityImage,description:''},
	{name:'Mistral Trade Route',frequency1:rare,frequency2:rare,frequency3:rare,affiliation:2,duration:0,image:utilityImage,description:''},
	{name:'Naval Ram',frequency1:common,frequency2:uncommon,frequency3:0,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Perimeter Defenses',frequency1:uncommon,frequency2:uncommon,frequency3:0,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Prototype Weaponry',frequency1:rare,frequency2:rare,frequency3:rare,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Reinforce Structure',frequency1:common,frequency2:uncommon,frequency3:rare,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Resourceful Raider',frequency1:0,frequency2:rare,frequency3:rare,affiliation:0,duration:0,image:utilityImage,description:''},
	{name:'Sandstorm',frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:0,nh0:1,nh1:0,nh2:1,duration:3,image:utilityImage,description:''},
	{name:'Schnee Dust Company',frequency1:0,frequency2:0,frequency3:1,affiliation:1,duration:999,image:utilityImage,description:''},
	{name:'Silver Eyes',frequency1:0,frequency2:0,frequency3:1,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Smugglers of Wind Path',frequency1:uncommon,frequency2:uncommon,frequency3:uncommon,affiliation:0,duration:0,image:utilityImage,description:''},
	{name:'Thruster Packs',frequency1:0,frequency2:rare,frequency3:uncommon,affiliation:0,duration:999,image:utilityImage,description:''},
	{name:'Tornado',frequency1:0,frequency2:uncommon,frequency3:rare,affiliation:0,nh0:1,nh1:1,nh2:1,duration:3,image:utilityImage,description:''}
];

$(document).ready(function () {
	document.getElementById('overlay').style.backgroundColor = 'rgba(0,0,0,0)';

	//create 3 divs, 1 for each player in order after the client's player's turn
	var tempPlayerNumber = 0;
	for (var pos = 1; pos < 4; pos++) {
		tempPlayerNumber = (playerNumber + pos);
		if (tempPlayerNumber > 3) {
			tempPlayerNumber = 0;
		}
		document.getElementById('p' + pos + 'Area').innerHTML = '<div><img src="' + kingdomPicArray[kingdom[tempPlayerNumber]] + '" width="40%"><BR>' + commName[tempPlayerNumber] + '<div id="player' + tempPlayerNumber + 'Cards" class="nOfCards">' + nOfCards[tempPlayerNumber] + '</div></div>';
	}

	//create decks for each stage using the card info arrays
	/*var stage1Deck = [];
	var stage2Deck = [];
	var stage3Deck = [];*/
	var drawPile = [];
	for (var i = 0; i < cardInfo.length; i++) {
		for (var j = 0; j < cardInfo[i].frequency1; j++) {
			drawPile.push(cardInfo[i]);
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

	//just temporary
	for (var i = 0; i < 8; i++) {
		document.getElementsByClassName('cardImage')[i].innerHTML = drawPile[i].name;
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
	var canvas = document.getElementById('gameBoardCanvas');
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
	ctx.fillStyle = 'rgba(255,255,255,0.4)';
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
			div.style.color = 'lightyellow';
			div.textContent = ter;
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
			if(ter == highlight){
				ctx.fill();
			}
		}
	}
    document.getElementById('territoryDiv10').textContent = '<table id="terTable10"><tr><td id="capitalTer10">★</td></tr>';
    document.getElementById('territoryDiv18').textContent = '★';
    document.getElementById('territoryDiv29').textContent = '★';
    document.getElementById('territoryDiv35').textContent = '★';
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
	}
});