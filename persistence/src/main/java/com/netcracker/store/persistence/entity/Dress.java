package com.netcracker.store.persistence.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "dress")
@EqualsAndHashCode(callSuper = false)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter @Setter
public class Dress extends BaseEntity {

    private static final long serialVersionUID = 3932117536853558680L;

    @ManyToOne
    @JoinColumn(name = "manufacturer_id", referencedColumnName = "id")
    @NotNull(message = "Manufacturer cannot be null")
    private Manufacturer manufacturer;

    @ManyToOne
    @JoinColumn(name = "type_id", referencedColumnName = "id")
    @NotNull(message = "Type cannot be null")
    private Type type;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @NotNull(message = "Category cannot be null")
    private Category category;

    @OneToOne(mappedBy = "dress")
    private Description description;

    @NotNull(message = "Price cannot be null")
    @DecimalMin(value = "0.0", message = "Price cannot be lower than zero")
    private double price;

    @NotNull(message = "Amount cannot be null")
    @Min(value = 1, message = "Amount cannot be lower than zero")
    private int amount;

    @Column(name = "image_source")
    private String imageSource;

    @Column(name = "release_date")
    private Date releaseDate;

    @OneToMany(mappedBy = "dress")
    @JsonIgnore
    private Set<OrderDetail> orderDetailSet;

    @ManyToMany
    @JoinTable(name = "dress_has_size",
            joinColumns = @JoinColumn(name = "dress_id"),
            inverseJoinColumns = @JoinColumn(name = "size_id"))
    @NotNull(message = "Sizes cannot be null")
    private Set<Size> sizeSet;

    @ManyToMany
    @JoinTable(name = "dress_has_color",
            joinColumns = @JoinColumn(name = "dress_id"),
            inverseJoinColumns = @JoinColumn(name = "color_id"))
    @NotNull(message = "Colors cannot be null")
    private Set<Color> colorSet;

    @OneToMany(mappedBy = "dress")
    private Set<DressImage> dressImageSet;

    public Dress() {
        super();
    }

    public Dress(Manufacturer manufacturer,
                 Type type,
                 Category category,
                 Description description,
                 Double price,
                 String imageSource,
                 Date releaseDate,
                 Set<OrderDetail> orderDetailSet,
                 Set<Size> sizeSet,
                 Set<Color> colorSet,
                 Set<DressImage> dressImageSet) {
        this.manufacturer = manufacturer;
        this.type = type;
        this.category = category;
        this.description = description;
        this.price = price;
        this.imageSource = imageSource;
        this.releaseDate = releaseDate;
        this.orderDetailSet = orderDetailSet;
        this.sizeSet = sizeSet;
        this.colorSet = colorSet;
        this.dressImageSet = dressImageSet;
    }

    @Override
    public String toString() {
        return "Dress{" +
                "manufacturer=" + manufacturer +
                ", type=" + type +
                ", category=" + category +
                ", description=" + description +
                ", price=" + price +
                ", imageSource='" + imageSource + '\'' +
                ", releaseDate=" + releaseDate +
                ", orderDetailSet=" + orderDetailSet +
                ", sizeSet=" + sizeSet +
                ", colorSet=" + colorSet +
                ", dressImageSet=" + dressImageSet +
                '}';
    }
}
