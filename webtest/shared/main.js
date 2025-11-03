function insertBreakAfterColon(id)
{
    let el = document.getElementById(id);
    if (!el.dataset.originalHtml) {
        el.dataset.originalHtml = el.innerHTML; //保留初始HTML
    }
    el.innerHTML = el.dataset.originalHtml;
	
    let lineHeight = parseFloat(window.getComputedStyle(el).lineHeight); //文字高度
    if (el.scrollHeight > lineHeight) {
        el.innerHTML = el.innerHTML.replace("：", "：<br>");
    }
}

insertBreakAfterColon("address1_text");
insertBreakAfterColon("address2_text");

window.addEventListener("resize", () => insertBreakAfterColon("address1_text"));
window.addEventListener("resize", () => insertBreakAfterColon("address2_text"));