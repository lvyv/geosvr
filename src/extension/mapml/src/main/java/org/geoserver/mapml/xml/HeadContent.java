//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference
// Implementation, v2.2.8-b130911.1802
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a>
// Any modifications to this file will be lost upon recompilation of the source schema.
// Generated on: 2018.12.17 at 04:13:52 PM PST
//

package org.geoserver.mapml.xml;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

/**
 * Java class for headContent complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="headContent"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;choice maxOccurs="unbounded" minOccurs="0"&gt;
 *         &lt;element ref="{}base"/&gt;
 *         &lt;element ref="{}meta"/&gt;
 *         &lt;element ref="{}title"/&gt;
 *         &lt;group ref="{}links"/&gt;
 *       &lt;/choice&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "headContent")
public class HeadContent {

    @XmlElement(name = "title", namespace = "http://www.w3.org/1999/xhtml/")
    protected String title;

    @XmlElement(name = "base", namespace = "http://www.w3.org/1999/xhtml/")
    protected Base base;

    @XmlElement(name = "meta", type = Meta.class, namespace = "http://www.w3.org/1999/xhtml/")
    protected List<Meta> metas;

    @XmlElement(name = "link", type = Link.class, namespace = "http://www.w3.org/1999/xhtml/")
    protected List<Link> links;

    public void setTitle(String title) {
        this.title = title;
    }

    public void setBase(Base base) {
        this.base = base;
    }

    /**
     * Gets the value of the metas property.
     *
     * <p>This accessor method returns a reference to the live list, not a snapshot. Therefore any
     * modification you make to the returned list will be present inside the JAXB object. This is
     * why there is not a <CODE>set</CODE> method for the metas property.
     *
     * <p>For example, to add a new item, do as follows:
     *
     * <pre>
     *    getMetas().add(newItem);
     * </pre>
     *
     * @return list of meta elements
     */
    public List<Meta> getMetas() {
        if (metas == null) {
            metas = new ArrayList<>();
        }
        return this.metas;
    }

    /**
     * Gets the value of the links property.
     *
     * <p>This accessor method returns a reference to the live list, not a snapshot. Therefore any
     * modification you make to the returned list will be present inside the JAXB object. This is
     * why there is not a <CODE>set</CODE> method for the links property.
     *
     * <p>For example, to add a new item, do as follows:
     *
     * <pre>
     *    getLinks().add(newItem);
     * </pre>
     *
     * @return list of links
     */
    public List<Link> getLinks() {
        if (links == null) {
            links = new ArrayList<>();
        }
        return this.links;
    }
}
