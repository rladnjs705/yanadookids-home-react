import Image from 'next/image'
import CommonLink from "./CommonLink";
import Link from "next/link";

export default function footer() {
    return (
        <footer>
          <div className="container">
              <div className="footer-row clearfix">
                  <div className="footer-logo">

                  </div>
                  <div className="footer-sns">
                      <div className="sns-area">
                          <ul className="sns-lst clearfix">
                              <li>
                                  <CommonLink type={"300"} src={"/static/img/ico_ch.png"} alt={"채널"} />
                              </li>
                              <li>
                                  <CommonLink type={"301"} src={"/static/img/ico_blog.png"} alt={"블로그"} />
                              </li>
                              <li>
                                  <CommonLink type={"302"} src={"/static/img/ico_instagram.png"} alt={"인스타그램"} />
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="footer-info">
                      <ul className="info-lst clearfix">
                          <li><Link href="/policy/policy">이용약관</Link></li>
                          <li><Link href="/policy/privacy"><a  style={{fontFamily: "NanumSquare ExtraBold", color: "#ff6059"}}>개인정보 처리방침</a></Link></li>
                          <li><Link href="/policy/refund">환불 정책</Link></li>
                          <li><Link href="/board/faq">FAQ</Link></li>
                          <li><Link href="/bbs/notice">공지사항</Link></li>
                      </ul>

                      <p>주식회사 야나두</p>
                      <address>서울시 강남구 영동대로 96길 26, 3층 (삼성동, Place 1)</address>
                      <p className="copyright">Copyright ©Yanadoo Corp.</p>
                  </div>
              </div>
          </div>
       </footer>
    );
}