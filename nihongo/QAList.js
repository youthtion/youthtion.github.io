var QAList = new Array(
{que:"開く"				,ans:"あく"			,tip:"(something) open"						,group:1	,accr:0},
{que:"閉まる"			,ans:"しまる"		,tip:"(something) close"					,group:1	,accr:0},
{que:"開ける"			,ans:"あける"		,tip:"to open"								,group:2	,accr:0},
{que:"閉める"			,ans:"しめる"		,tip:"close"								,group:2	,accr:0},
{que:"歩く"				,ans:"あるく"		,tip:"to walk"								,group:3	,accr:0},
{que:"走る"				,ans:"はしる"		,tip:"run"									,group:3	,accr:0},
{que:"動く"				,ans:"うごく"		,tip:"(something) move"						,group:4	,accr:0},
{que:"止まる"			,ans:"とまる"		,tip:"(something) stop"						,group:4	,accr:0},
{que:"売る"				,ans:"うる"			,tip:"to sell"								,group:5	,accr:0},
{que:"買う"				,ans:"かう"			,tip:"to buy"								,group:5	,accr:0},
{que:"起きる"			,ans:"おきる"		,tip:"to get up"							,group:6	,accr:0},
{que:"寝る"				,ans:"ねる"			,tip:"go to bed"							,group:6	,accr:0},
{que:"押す"				,ans:"おす"			,tip:"to push"								,group:7	,accr:0},
{que:"引く"				,ans:"ひく"			,tip:"pull/draw"							,group:7	,accr:0},
{que:"降りる"			,ans:"おりる"		,tip:"to get off;to get out <of>"			,group:8	,accr:0},	//上がる/上る/登る
{que:"乗る"				,ans:"のる"			,tip:"take/ride on"							,group:8	,accr:0},
{que:"終わる"			,ans:"おわる"		,tip:"(something) be finished"				,group:9	,accr:0},
{que:"始まる"			,ans:"はじまる"		,tip:"(something) begin"					,group:9	,accr:0},
{que:"返す"				,ans:"かえす"		,tip:"to return"							,group:10	,accr:0},
{que:"借りる"			,ans:"かりる"		,tip:"borrow"								,group:10	,accr:0},
{que:"貸す"				,ans:"かす"			,tip:"to lend"								,group:10	,accr:0},
{que:"書く"				,ans:"かく"			,tip:"to write"								,group:11	,accr:0},
{que:"読む"				,ans:"よむ"			,tip:"read"									,group:11	,accr:0},
{que:"掛ける"			,ans:"かける"		,tip:"to wear(a glass)/to telephone"		,group:12	,accr:0},	//外す
{que:"切る"				,ans:"きる"			,tip:"cut"									,group:12	,accr:0},	//結ぶ/続ける/繋ぐ
{que:"被る"				,ans:"かぶる"		,tip:"put on (hat)"							,group:13	,accr:0},
{que:"着る"				,ans:"きる"			,tip:"to put (tops) on/to wear (tops)"		,group:13	,accr:0},
{que:"穿く"				,ans:"はく"			,tip:"to put (buttoms) on/wear (buttoms)"	,group:13	,accr:0},
{que:"履く"				,ans:"はく"			,tip:"to put (buttoms) on/wear (buttoms)"	,group:13	,accr:0},
{que:"脱ぐ"				,ans:"ぬぐ"			,tip:"take off"								,group:13	,accr:0},
{que:"帰る"				,ans:"かえる"		,tip:"to go back/to be back"				,group:14	,accr:0},	//行く/往く
{que:"来る"				,ans:"くる"			,tip:"to come"								,group:14	,accr:0},	//行く/往く
{que:"聞く"				,ans:"きく"			,tip:"listen to/ask"						,group:15	,accr:0},
{que:"話す"				,ans:"はなす"		,tip:"talk/speak"							,group:15	,accr:0},
{que:"消す"				,ans:"けす"			,tip:"turn off"								,group:16	,accr:0},
{que:"点ける"			,ans:"つける"		,tip:"turn on"								,group:16	,accr:0},
{que:"厚い"				,ans:"あつい"		,tip:"thick"								,group:17	,accr:0},
{que:"薄い"				,ans:"うすい"		,tip:"thin"									,group:17	,accr:0},
{que:"会う"				,ans:"あう"			,tip:"to meet"								,group:0	,accr:0},
{que:"＿＿る"			,ans:"あげる"		,tip:"to give"								,group:0	,accr:0},
{que:"遊ぶ"				,ans:"あそぶ"		,tip:"to have fun/to play"					,group:0	,accr:0},
{que:"洗う"				,ans:"あらう"		,tip:"to wash"								,group:0	,accr:0},
{que:"＿る"				,ans:"ある"			,tip:"to be/to have"						,group:0	,accr:0},
{que:"言う"				,ans:"いう"			,tip:"to say/to talk"						,group:0	,accr:0},
{que:"要る"				,ans:"いる"			,tip:"to need/to be necessary"				,group:0	,accr:0},
{que:"入れる"			,ans:"いれる"		,tip:"to put (any) in"						,group:0	,accr:0},	//出す
{que:"歌う"				,ans:"うたう"		,tip:"to sing"								,group:0	,accr:0},
{que:"置く"				,ans:"おく"			,tip:"to put"								,group:0	,accr:0},
{que:"送る"				,ans:"おくる"		,tip:"to send"								,group:0	,accr:0},	//迎える
{que:"行う"				,ans:"おこなう"		,tip:"to do/to operate"						,group:0	,accr:0},
{que:"覚える"			,ans:"おぼえる"		,tip:"to memorize"							,group:0	,accr:0},	//忘れる
{que:"泳ぐ"				,ans:"およぐ"		,tip:"to swim"								,group:0	,accr:0},
{que:"消える"			,ans:"きえる"		,tip:"be extinguished"						,group:0	,accr:0},	//現れる/点る/灯る/燃える/点く/熾る
{que:"答える"			,ans:"こたえる"		,tip:"answer"								,group:0	,accr:0},	//問う/尋ねる
{que:"困る"				,ans:"こまる"		,tip:"be in trouble"						,group:0	,accr:0},
{que:"知る"				,ans:"しる"			,tip:"know"									,group:0	,accr:0},
{que:"住む"				,ans:"すむ"			,tip:"live"									,group:0	,accr:0},
{que:"立つ"				,ans:"たつ"			,tip:"stand"								,group:0	,accr:0},	//座る
{que:"頼む"				,ans:"たのむ"		,tip:"ask/request"							,group:0	,accr:0},
{que:"食べる"			,ans:"たべる"		,tip:"eat"									,group:0	,accr:0},
{que:"使う"				,ans:"つかう"		,tip:"use"									,group:0	,accr:0},
{que:"疲れる"			,ans:"つかれる"		,tip:"be tired"								,group:0	,accr:0},
{que:"着く"				,ans:"つく"			,tip:"arrive"								,group:0	,accr:0},
{que:"作る"				,ans:"つくる"		,tip:"make"									,group:0	,accr:0},
{que:"勤める"			,ans:"つとめる"		,tip:"work for"								,group:0	,accr:0},
{que:"出かける"			,ans:"でかける"		,tip:"go out"								,group:0	,accr:0},
{que:"出来る"			,ans:"できる"		,tip:"can"									,group:0	,accr:0},
{que:"飛ぶ"				,ans:"とぶ"			,tip:"fly"									,group:0	,accr:0},
{que:"取る"				,ans:"とる"			,tip:"take"									,group:0	,accr:0},
{que:"習う"				,ans:"ならう"		,tip:"learn"								,group:0	,accr:0},	//教える
{que:"並ぶ"				,ans:"ならぶ"		,tip:"make a line"							,group:0	,accr:0},
{que:"並べる"			,ans:"ならべる"		,tip:"display"								,group:0	,accr:0},
{que:"＿る"				,ans:"なる"			,tip:"become"								,group:0	,accr:0},
{que:"飲む"				,ans:"のむ"			,tip:"drink"								,group:0	,accr:0},	//吐く/吸う
{que:"入る"				,ans:"はいる"		,tip:"enter"								,group:0	,accr:0},	//入る/出る
{que:"始める"			,ans:"はじめる"		,tip:"start"								,group:0	,accr:0},	//終える
{que:"働く"				,ans:"はたらく"		,tip:"work"									,group:0	,accr:0},
{que:"貼る"				,ans:"はる"			,tip:"paste/put some on"					,group:0	,accr:0},	//剥がす/張る
{que:"弾く"				,ans:"ひく"			,tip:"play (instrument)"					,group:0	,accr:0},
{que:"降る"				,ans:"ふる"			,tip:"fall/come down/rain"					,group:0	,accr:0},	//照る/止む
{que:"曲がる"			,ans:"まがる"		,tip:"turn"									,group:0	,accr:0},
{que:"磨く"				,ans:"みがく"		,tip:"brush"								,group:0	,accr:0},
{que:"見る"				,ans:"みる"			,tip:"look"									,group:0	,accr:0},
{que:"呼ぶ"				,ans:"よぶ"			,tip:"call"									,group:0	,accr:0},
{que:"渡す"				,ans:"わたす"		,tip:"hand over"							,group:0	,accr:0},
{que:"渡る"				,ans:"わたる"		,tip:"cross"								,group:0	,accr:0},
{que:"明るい"			,ans:"あかるい"		,tip:"bright"								,group:0	,accr:0},	//暗い
{que:"赤い"				,ans:"あかい"		,tip:"red"									,group:0	,accr:0},
{que:"暖かい"			,ans:"あたたかい"	,tip:"warm"									,group:0	,accr:0},	//寒い/冷たい
{que:"新しい"			,ans:"あたらしい"	,tip:"new"									,group:0	,accr:0},	//古い
{que:"暑い"				,ans:"あつい"		,tip:"hot (temperature)"					,group:0	,accr:0},	//寒い
{que:"熱い"				,ans:"あつい"		,tip:"hot (heat)"							,group:0	,accr:0},	//冷たい/温い
{que:"危ない"			,ans:"あぶない"		,tip:"dangerous"							,group:0	,accr:0},	//安全な
{que:"＿い"				,ans:"いい"			,tip:"good"									,group:0	,accr:0},
{que:"忙しい"			,ans:"いそがしい"	,tip:"busy"									,group:0	,accr:0},	//暇/暇な
{que:"痛い"				,ans:"いたい"		,tip:"painful"								,group:0	,accr:0},
{que:"嫌な"				,ans:"いやな"		,tip:"hateful"								,group:0	,accr:0},
{que:"美味しい"			,ans:"おいしい"		,tip:"delicious"							,group:0	,accr:0},	//不味い
{que:"大きい"			,ans:"おおきい"		,tip:"big"									,group:0	,accr:0},	//小さい
{que:"＿"}
);
