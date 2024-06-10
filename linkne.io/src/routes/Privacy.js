import {useState}from 'react'
import Footer from '../components/Footer'

export const Privacy = () => {
  const [language, setLanguage] = useState("en")

  return (

    <div>



        <div className='container  mx-auto w-10/12 md:w-full'>
          <h1 className = "text-3xl text-center font-bold">{language==="tr" ? "Gizlilik Sözleşmesi" : "Privacy and Policy"}</h1>


          <div className="tabs">
            <a className= {`tab tab-lifted ${language === "tr" ? "tab-active": ""}`} onClick = {() => setLanguage("tr")}>Turkish</a>
            <a className={`tab tab-lifted ${language === "en" ? "tab-active": ""}`} onClick = {() => setLanguage("en")}>English</a>
          </div>

          {language === 'tr' ?
              <div>

                  <div className = "mt-2">
                    <p>Ziyaretçilerimizin mahremiyeti bizim için çok önemlidir. Lütfen dikkatlice okuyunuz.</p>
                    <p>Bu Gizlilik Politikası, <a className = "text-blue-500" href = "https://linkne.io">https://linkne.io/</a> ve <a className = "text-blue-500"  href = "https://linkne.link">https://linkne.link</a>  ("Site") ziyaret ettiğinizde veya buradan ödeme aldığınızda kişisel bilgilerinizin nasıl toplandığını, kullanıldığını ve paylaşıldığını açıklar. </p>
                  </div>

                  <div className = "mt-4">
                    <h1 className = "text-xl font-semibold">TOPLADIĞIMIZ KİŞİSEL BİLGİLER</h1>
                    <p>Siteyi ziyaret ettiğinizde, web tarayıcınız, IP adresiniz, saat diliminiz ve cihazınıza yüklenen bazı tanımlama bilgileri dahil olmak üzere cihazınız hakkında belirli bilgileri otomatik olarak topluyoruz. Ek olarak, siz Sitede gezinirken, görüntülediğiniz tek tek web sayfaları, sizi Siteye yönlendiren web siteleri veya arama terimleri ve Site ile nasıl etkileşim kurduğunuz hakkında bilgi topluyoruz. Otomatik olarak toplanan bu bilgilere "Cihaz Bilgileri" diyoruz.</p>
                    <p className = "mt-3">Cihaz Bilgilerini aşağıdaki teknolojileri kullanarak topluyoruz:</p>
                    <p>-“Çerezler”, cihazınıza veya bilgisayarınıza yerleştirilen ve genellikle anonim, benzersiz bir tanımlayıcı içeren veri dosyalarıdır. Çerezler ve çerezlerin nasıl devre dışı bırakılacağı hakkında daha fazla bilgi için http://www.allaboutcookies.org adresini ziyaret edin.</p>
                    <p>-“Günlük dosyaları”, Sitede gerçekleşen eylemleri izler ve IP adresiniz, tarayıcı tipiniz, İnternet servis sağlayıcınız, yönlendiren/çıkış sayfaları ve tarih/zaman damgaları dahil olmak üzere verileri toplar.</p>
                    <p>-“Yerel Depolama”, cihazınızda bir web sitesi tarafından oluşturulan bir dosyadır. "Yerel Depolama" kalıcıdır. Tarayıcınızın geçmişini silerek bunları silebilirsiniz. </p>


                    <p className = "mt-3">
                    Ayrıca, Site aracılığıyla bir ödeme aldığınızda veya ödeme almaya çalıştığınızda, adınız, fatura adresiniz, ödeme bilgileriniz (kredi kartı numaraları, BTC Wallet, Payeer, PayPal, Tether, AdvCash dahil), sizden belirli bilgileri topluyoruz. e-posta adresi ve telefon numarası. Bu bilgilere “Ödeme Bilgileri” diyoruz.
                    </p>
                    <p className = "">
                    Bu Gizlilik Politikasında "Kişisel Bilgiler"den bahsettiğimizde, hem Cihaz Bilgilerinden hem de Ödeme Bilgilerinden bahsediyoruz.
                    </p>

                  </div>

                  <div className = "mt-4">
                    <h1 className = "text-xl font-semibold">KİŞİSEL BİLGİLERİNİZİ NASIL KULLANIYORUZ?</h1>
                    <p>Topladığımız Ödeme Bilgilerini genel olarak Site aracılığıyla yapılan herhangi bir ödemeyi gerçekleştirmek için kullanırız (ödeme bilgilerinizin işlenmesi ve size faturalar ve/veya ödeme onayları sağlanması dahil). Ek olarak, bu Ödeme Bilgilerini şu amaçlarla kullanırız:
                       sizinle iletişim kurmak;
                       Ödememizi potansiyel risk veya dolandırıcılık açısından inceleyin; Ve
                       Bizimle paylaştığınız tercihler doğrultusunda size ürünlerimiz veya hizmetlerimizle ilgili bilgi veya reklam sağlamak.
                    </p>
                    <p>Topladığımız Cihaz Bilgilerini, potansiyel risk ve dolandırıcılığı (özellikle IP adresinizi) taramamıza yardımcı olması için ve daha genel olarak Sitemizi iyileştirmek ve optimize etmek için (örneğin, ziyaretçilerimizin Sitede nasıl gezindiği ve etkileşimde bulunduğu hakkında analizler üreterek kullanırız. Site ve pazarlama ve reklam kampanyalarımızın başarısını değerlendirmek için).</p>

                  </div>

                  <div className = "mt-4">
                    <h1 className = "text-xl font-semibold">KİŞİSEL BİLGİLERİNİZİN PAYLAŞILMASI</h1>
                    <p>Kişisel Bilgilerinizi yukarıda açıklandığı şekilde kullanmamıza yardımcı olması için Kişisel Bilgilerinizi üçüncü taraflarla paylaşırız. Ziyaretçilerimizin Siteyi nasıl kullandığını anlamamıza yardımcı olması için Google Analytics'i de kullanıyoruz - Google'ın Kişisel Bilgilerinizi nasıl kullandığı hakkında daha fazla bilgiyi buradan edinebilirsiniz: https://www.google.com/intl/en/policies/privacy/. Google Analytics'i buradan da devre dışı bırakabilirsiniz: https://tools.google.com/dlpage/gaoptout.</p>
                    <p>Son olarak, Kişisel Bilgilerinizi yürürlükteki yasalara ve düzenlemelere uymak, bir mahkeme celbine, arama iznine veya bilgi için aldığımız diğer yasal taleplere yanıt vermek veya haklarımızı başka bir şekilde korumak için paylaşabiliriz.</p>
                  </div>

                  <div className = "mt-4">
                    <h1 className = "text-xl font-semibold">DAVRANIŞSAL REKLAMCILIK</h1>
                    <p>Yukarıda açıklandığı gibi, Kişisel Bilgilerinizi ilginizi çekebileceğini düşündüğümüz hedefli reklamlar veya pazarlama iletişimleri sağlamak için kullanırız. Hedefli reklamcılığın nasıl çalıştığı hakkında daha fazla bilgi için, Ağ Reklamcılığı Girişiminin ("NAI") http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work adresindeki eğitim sayfasını ziyaret edebilirsiniz.</p>
                  </div>

                  <div className = "mt-4">
                    <h1 className = "text-xl font-semibold">TAKİP ETMEYİN</h1>
                    <p>Tarayıcınızdan bir Takip Etme sinyali gördüğümüzde Sitemizin veri toplama ve kullanım uygulamalarını değiştirmediğimizi lütfen unutmayın.</p>
                  </div>



                  <div className = "mt-4">
                    <h1 className = "text-xl font-semibold">HAKLARINIZ</h1>
                    <p>Avrupa'da ikamet ediyorsanız, hakkınızda tuttuğumuz kişisel bilgilere erişme ve kişisel bilgilerinizin düzeltilmesini, güncellenmesini veya silinmesini isteme hakkına sahipsiniz. Bu hakkınızı kullanmak istiyorsanız, lütfen aşağıdaki iletişim bilgilerinden bizimle iletişime geçin.</p>
                     <p>Ayrıca, Avrupa'da ikamet ediyorsanız, bilgilerinizi sizinle yapabileceğimiz sözleşmeleri yerine getirmek (örneğin, Site aracılığıyla bir ödeme almanız durumunda) veya başka bir şekilde meşru ticari çıkarlarımızı sürdürmek için işlediğimizi not ediyoruz. yukarıda listelenen. Ayrıca, bilgilerinizin Kanada ve Amerika Birleşik Devletleri de dahil olmak üzere Avrupa dışına aktarılacağını lütfen unutmayın.</p>
                  </div>

                  <div className = "mt-4">
                    <h1 className = "text-xl font-semibold">VERİ SAKLAMA</h1>
                    <p>Site aracılığıyla bir ödeme aldığınızda, Ödeme Bilgilerinizi, siz bizden bu bilgiyi silmemizi istemedikçe ve talep edene kadar kayıtlarımız için saklayacağız.</p>
                  </div>

                  <div className = "mt-4">
                    <h1 className = "text-xl font-semibold">KÜÇÜKLER</h1>
                    <p>Site, 18 yaşının altındaki bireyler için tasarlanmamıştır. Bu web sitesi, yetişkinler için yapılmış reklamlar veya içerikler içerebilir. 18 yaşından küçükseniz, herhangi bir sorundan sorumlu değiliz.</p>
                  </div>

                  <div className = "mt-4">
                    <h1 className = "text-xl font-semibold">CHANGES</h1>
                    <p>Örneğin uygulamalarımızdaki değişiklikleri yansıtmak veya diğer operasyonel, yasal veya düzenleyici nedenlerle bu gizlilik politikasını zaman zaman güncelleyebiliriz.</p>
                  </div>



                  <div className = "mt-4">
                    <h1 className = "text-xl font-semibold">BİZE ULAŞIN</h1>
                    <p>Gizlilik uygulamalarımız hakkında daha fazla bilgi için, sorularınız varsa veya şikayette bulunmak isterseniz, lütfen <a className = "text-blue-500" href = "mailto:support@linkne">support@linkne.io</a>.</p>
                  </div>

                  </div>


          :
          <div>
            <div className='mt-2'>
              <p>The privacy of our visitors is very important to us. Please read it carefully.</p>
              <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or receive payment from <a className = "text-blue-500" href = "https://linkne.io">https://linkne.io/</a> and <a className = "text-blue-500"  href = "https://linkne.link">https://linkne.link</a> (the “Site”).</p>
            </div>

            <div className = "mt-4">
              <h1 className = "text-xl font-semibold">PERSONAL INFORMATION WE COLLECT</h1>
              <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”</p>
              <p className = "mt-3">We collect Device Information using the following technologies:</p>
              <p>- “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.</p>
              <p>- “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</p>
              <p>- “Local Storage” is a file created by a website in your device. “Local Storage” is persistent. You may erase them by deleting your browser’s history. </p>


              <p className = "mt-3">
                Additionally when you receive a payment or attempt to receive a payment through the Site, we collect certain information from you, including your name, billing address, payment information (including credit card numbers, BTC Wallet, Payeer, PayPal, Tether, AdvCash), email address, and phone number.  We refer to this information as “Payment Information.”
              </p>
              <p className = "">
              When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Payment Information.
              </p>

            </div>

            <div className = "mt-4">
              <h1 className = "text-xl font-semibold">HOW DO WE USE YOUR PERSONAL INFORMATION?</h1>
              <p>We use the Payment Information that we collect generally to fulfill any payment placed through the Site (including processing your payment information, and providing you with invoices and/or payment confirmations).  Additionally, we use this Payment Information to:
                Communicate with you;
                Screen our payment for potential risk or fraud; and
                When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.
              </p>
              <p>We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our visitors browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</p>

            </div>

            <div className = "mt-4">
              <h1 className = "text-xl font-semibold">SHARING YOUR PERSONAL INFORMATION</h1>
              <p>We share your Personal Information with third parties to help us use your Personal Information, as described above. We also use Google Analytics to help us understand how our visitors use the Site--you can read more about how Google uses your Personal Information here:  https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics here:  https://tools.google.com/dlpage/gaoptout.</p>
              <p>Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>
            </div>

            <div className = "mt-4">
              <h1 className = "text-xl font-semibold">BEHAVIOURAL ADVERTISING</h1>
              <p>As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you.  For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.</p>
            </div>

            <div className = "mt-4">
              <h1 className = "text-xl font-semibold">DO NOT TRACK</h1>
              <p>Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.</p>
            </div>



            <div className = "mt-4">
              <h1 className = "text-xl font-semibold">YOUR RIGHTS</h1>
              <p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>
              <p>Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you receive a payment through the Site), or otherwise to pursue our legitimate business interests listed above.  Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.</p>
            </div>

            <div className = "mt-4">
              <h1 className = "text-xl font-semibold">DATA RETENTION</h1>
              <p>When you receive a payment through the Site, we will maintain your Payment Information for our records unless and until you ask us to delete this information.</p>
            </div>

            <div className = "mt-4">
              <h1 className = "text-xl font-semibold">MINORS</h1>
              <p>The Site is not intended for individuals under the age of 18.  If you are under 18, we are not responsible for any problems. </p>
            </div>

            <div className = "mt-4">
              <h1 className = "text-xl font-semibold">CHANGES</h1>
              <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>
            </div>



            <div className = "mt-4">
              <h1 className = "text-xl font-semibold">CONTACT US</h1>
              <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a className = "text-blue-500" href = "mailto:support@linkne.io">support@linkne.io</a>.</p>
            </div>
          </div>
          }




        </div>
          <Footer></Footer>
    </div>
  )
}

export default Privacy;
