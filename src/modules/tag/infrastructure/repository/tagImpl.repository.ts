import { InjectRepository } from "@nestjs/typeorm";
import { ITagRepository } from "../../domain/interface/itag.repository";
import { TagEntity } from "../../domain/model/tag.entity";
import { Repository } from "typeorm";
import { TicketEntity } from "src/modules/ticket/domain/model/ticket.entity";
import { TicketDetailEntity } from "src/modules/ticket-detail/domain/model/ticketDetail.entity";
import { ErrorManager } from "src/utils/errors/error.manager";

export class TagImplRepository implements ITagRepository {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagOrmRepository: Repository<TagEntity>,
        @InjectRepository(TicketEntity)
        private readonly ticketOrmRepository: Repository<TicketEntity>,
        @InjectRepository(TicketDetailEntity)
        private readonly ticketDetailOrmRepository: Repository<TicketDetailEntity>,
    ){}

    
    
    async createTag(tag: TagEntity): Promise<TagEntity> {
        const tagPreload = this.tagOrmRepository.create(tag);
        const resultTag = await this.tagOrmRepository.save(tagPreload);
        return resultTag;
    }
    
    async updateTagById(id: number, tagReq: TagEntity): Promise<TagEntity> {
        const tag = await this.tagOrmRepository.findOneBy({id: id});
        if (!tag) return null;
        const tagPreload = await this.tagOrmRepository.preload({
            id: tag.id,
            ...tagReq
        })
        const tagUpdated = await this.tagOrmRepository.save(tagPreload);
        return tagUpdated;
    }
    
    async deleteTagById(id: number): Promise<TagEntity> {
        const tag = await this.tagOrmRepository.findOneBy({id: id});
        if (!tag) return null;

        const tagDeleted = await this.tagOrmRepository.remove(tag);
        return tagDeleted;
    }
    
    async findTagById(id: number): Promise<TagEntity> {
        const tag = this.tagOrmRepository.findOneBy({ id: id });
        return tag;
    }
    
    async findTicketsByTagId(id: number): Promise<TicketEntity[]> {
        const tdetails = await this.ticketDetailOrmRepository.find(
            { where: {tag: {id: id}}, relations: ['ticket']}
            );
   
        const ticketIds = tdetails.map((responseTd) => responseTd.ticket.id);

        if (ticketIds.length === 0) {
            return [];
        }
        
        const tickets = await this.ticketOrmRepository
        .createQueryBuilder('ticket')
        .where('ticket.id IN (:...ids)', { ids: ticketIds })
        .getMany();

        return tickets;
    }

    async assignTagToTicketDetail(id: number, tdetailId: number): Promise<TicketDetailEntity> {
        const tag = await this.tagOrmRepository.findOneBy({ id: id });
        if(!tag) {
            throw new ErrorManager({
                type: 'NOT_FOUND',
                message: `Tag with Id ${id} not found`
            })
        }
        const ticketDetail = await this.ticketDetailOrmRepository.findOneBy({id: tdetailId})
        if(!ticketDetail) return null;
        
        const ticketDetailPreload = await this.ticketDetailOrmRepository.preload({
            id: ticketDetail.id,
            tag: tag,
            ...ticketDetail
        })
        return await this.ticketDetailOrmRepository.save(ticketDetailPreload);
    }

    async listAllTags(): Promise<TagEntity[]> {
        return await this.tagOrmRepository.find({});
    }
}